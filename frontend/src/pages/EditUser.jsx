import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import instance from "../../axiosConfig";

const EditUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    dob: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchUser();
  }, []);

  async function fetchUser() {
    try {
      const res = await instance.get(`/users/${id}`, {
        withCredentials: true,
      });

      const user = res.data;

      setFormData({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        address: user.address || "",
        dob: user.dob ? user.dob.split("T")[0] : "",
      });
    } catch (error) {
      alert(error.response?.data?.message || "Failed to fetch user");
      navigate("/");
    } finally {
      setLoading(false);
    }
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" }); // clear error on typing
  }

  function validate() {
    const newErrors = {};

    // Phone validation
    if (!formData.phone) {
      newErrors.phone = "Phone number is required";
    } else if (!/^[0-9]{10}$/.test(formData.phone)) {
      newErrors.phone = "Phone number must be 10 digits";
    }

    // Address validation
    if (!formData.address.trim()) {
      newErrors.address = "Address is required";
    } else if (formData.address.trim().length < 10) {
      newErrors.address = "Address must be at least 10 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!validate()) return;

    try {
      const res = await instance.put(
        `/users/${id}`,
        {
          phone: formData.phone,
          address: formData.address.trim(),
          dob: formData.dob,
        },
        { withCredentials: true }
      );

      setMessage(res.data.message);

      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (error) {
      alert(error.response?.data?.message || "Update failed");
    }
  }

  if (loading) {
    return <p style={{ textAlign: "center" }}>Loading user...</p>;
  }

  return (
    <div className="edit-container">
      <div className="edit-box">
        <h2>Edit User</h2>

        {message && <p className="success">{message}</p>}

        <form onSubmit={handleSubmit}>
          {/* Readonly fields */}
          <input value={formData.name} disabled />
          <input value={formData.email} disabled />

          {/* Phone */}
          <input
            name="phone"
            type="tel"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            className={errors.phone ? "input-error" : ""}
          />
          {errors.phone && <p className="error">{errors.phone}</p>}

          {/* Address */}
          <input
            name="address"
            placeholder="Address"
            value={formData.address}
            onChange={handleChange}
            className={errors.address ? "input-error" : ""}
          />
          {errors.address && <p className="error">{errors.address}</p>}

          {/* DOB */}
          <input
            type="date"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
          />

          <button type="submit">Update User</button>
        </form>
      </div>
    </div>
  );
};

export default EditUser;
