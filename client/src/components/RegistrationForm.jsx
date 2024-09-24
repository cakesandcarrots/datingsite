import { useState, useEffect } from "react";
import axios from "axios";
import ReCAPTCHA from "react-google-recaptcha";

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    profilePicture: null,
    email: "",
    gender: "",
    dateOfBirth: "",
    hobbies: [],
    biography: "",
    hairColor: "",
    eyeColor: "",
    bodyType: "",
    height: "",
    weight: "",
    ethnicity: "",
    location: "",
    password: "",
    confirmPassword: "",
    recaptcha: "",
  });

  const [errors, setErrors] = useState({});
  const [coordinates, setCoordinates] = useState(null);
  const [dropdownData, setDropdownData] = useState({
    bodyshape: [],
    ethnicity: [],
    eyecolor: [],
    gender: [],
    haircolor: [],
    hobbies: [],
  });

  useEffect(() => {
    const fetchDropdownData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/staticdata/fetchData`
        );
        console.log("Fetched dropdown data:", response.data);
        setDropdownData(response.data);
      } catch (error) {
        console.error("Error fetching dropdown data:", error);
      }
    };

    fetchDropdownData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === "password" || name === "confirmPassword") {
      validatePassword(name, value);
    }
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, profilePicture: e.target.files[0] });
  };

  const handleLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setFormData({
            ...formData,
            location: { lat: latitude, lng: longitude },
          });
          setCoordinates({ latitude, longitude });
        },
        (error) => {
          console.error("Error obtaining location", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser");
    }
  };

  const handleHobbiesChange = (e) => {
    const selectedHobby = e.target.value;
    if (selectedHobby && !formData.hobbies.includes(selectedHobby)) {
      setFormData({
        ...formData,
        hobbies: [...formData.hobbies, selectedHobby],
      });
    }
  };

  const handleHobbyClick = (hobbyToRemove) => {
    setFormData({
      ...formData,
      hobbies: formData.hobbies.filter((hobby) => hobby !== hobbyToRemove),
    });
  };

  const handleRecaptchaChange = (value) => {
    setFormData({ ...formData, recaptcha: value });
  };

  const validatePassword = (name, value) => {
    let errors = {};
    if (name === "password" && value !== formData.confirmPassword) {
      errors.password = "Passwords do not match";
    } else if (name === "confirmPassword" && value !== formData.password) {
      errors.password = "Passwords do not match";
    } else {
      delete errors.password;
    }
    setErrors(errors);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (Object.keys(errors).length > 0) {
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setErrors({ password: "Passwords do not match" });
      return;
    }

    const formDataToSend = new FormData();
    Object.keys(formData).forEach((key) => {
      if (key === "location") {
        formDataToSend.append("location", JSON.stringify(formData[key]));
      } else {
        formDataToSend.append(key, formData[key]);
      }
    });

    

    try {
      await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/auth/register`,
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      
      setFormData({
        firstname: "",
        lastname: "",
        profilePicture: null,
        email: "",
        gender: "",
        dateOfBirth: "",
        hobbies: [],
        biography: "",
        hairColor: "",
        eyeColor: "",
        bodyType: "",
        height: "",
        weight: "",
        ethnicity: "",
        location: "",
        password: "",
        confirmPassword: "",
        recaptcha: "",
      });

      setErrors({});
    } catch (error) {
      
      console.error("Error during registration:", error);
    }
  };

  return (
    <div className="bg-[#f9c3c2] min-h-screen flex items-center justify-center">
      <section className="max-w-4xl p-6 mx-auto bg-[#f7eded] rounded-md shadow-md mt-20">
        <h2 className="text-lg font-semibold text-[#7e5959] capitalize">
          Ready to Find Your Perfect Match?
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
            <div>
              <label className="text-[#7e5959]" htmlFor="firstname">
                First Name
              </label>
              <input
                id="firstname"
                type="text"
                name="firstname"
                value={formData.firstname}
                onChange={handleChange}
                className="block w-full px-4 py-2 mt-2 text-[#7e5959] bg-white border border-[#a8a7a7] rounded-md focus:border-[#fbb4b3] focus:outline-none focus:ring"
                required
              />
            </div>
            <div>
              <label className="text-[#7e5959]" htmlFor="lastname">
                Last Name
              </label>
              <input
                id="lastname"
                type="text"
                name="lastname"
                value={formData.lastname}
                onChange={handleChange}
                className="block w-full px-4 py-2 mt-2 text-[#7e5959] bg-white border border-[#a8a7a7] rounded-md focus:border-[#fbb4b3] focus:outline-none focus:ring"
                required
              />
            </div>
            <div>
              <label className="text-[#7e5959]" htmlFor="profilePicture">
                Profile Picture
              </label>
              <input
                id="profilePicture"
                type="file"
                name="profilePicture"
                onChange={handleFileChange}
                className="block w-full px-4 py-2 mt-2 text-[#7e5959] bg-white border border-[#a8a7a7] rounded-md focus:border-[#fbb4b3] focus:outline-none focus:ring"
                accept="image/png, image/jpeg"
                required
              />
            </div>
            <div>
              <label className="text-[#7e5959]" htmlFor="email">
                Email
              </label>
              <input
                id="email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="block w-full px-4 py-2 mt-2 text-[#7e5959] bg-white border border-[#a8a7a7] rounded-md focus:border-[#fbb4b3] focus:outline-none focus:ring"
                required
              />
            </div>
            <div>
              <label className="text-[#7e5959]" htmlFor="gender">
                Gender
              </label>
              <select
                id="gender"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="block w-full px-4 py-2 mt-2 text-[#7e5959] bg-white border border-[#a8a7a7] rounded-md focus:border-[#fbb4b3] focus:outline-none focus:ring"
                required
              >
                <option value="">Select Gender</option>
                {dropdownData.gender.map((gender) => (
                  <option key={gender.id} value={gender.id}>
                    {gender.gender}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-[#7e5959]" htmlFor="dateOfBirth">
                Date of Birth
              </label>
              <input
                id="dateOfBirth"
                type="date"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleChange}
                className="block w-full px-4 py-2 mt-2 text-[#7e5959] bg-white border border-[#a8a7a7] rounded-md focus:border-[#fbb4b3] focus:outline-none focus:ring"
                required
              />
            </div>
            <div>
              <label className="text-[#7e5959]" htmlFor="hobbies">
                Hobbies
              </label>
              <select
                id="hobbies"
                name="hobbies"
                onChange={handleHobbiesChange}
                className="block w-full px-4 py-2 mt-2 text-[#7e5959] bg-white border border-[#a8a7a7] rounded-md focus:border-[#fbb4b3] focus:outline-none focus:ring"
              >
                <option value="">Select Hobby</option>
                {dropdownData.hobbies.map((hobby) => (
                  <option key={hobby.id} value={hobby.hobby}>
                    {hobby.hobby}
                  </option>
                ))}
              </select>
              <div className="h-24 mt-2 border border-[#a8a7a7] rounded-md p-2 overflow-y-auto">
                {formData.hobbies.map((hobby, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between py-1"
                  >
                    <span>{hobby}</span>
                    <button
                      type="button"
                      onClick={() => handleHobbyClick(hobby)}
                      className="text-red-500"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            </div>
            <div className="col-span-2">
              <button
                type="button"
                onClick={handleLocation}
                className="px-4 py-2 bg-[#f16664] text-white rounded-md hover:bg-[#e88888]"
              >
                Add Location
              </button>
              {coordinates && (
                <p className="mt-2 text-[#7e5959]">
                  Latitude: {coordinates.latitude}, Longitude:{" "}
                  {coordinates.longitude}
                </p>
              )}
            </div>
            <div className="col-span-2">
              <label className="text-[#7e5959]" htmlFor="biography">
                Biography
              </label>
              <textarea
                id="biography"
                name="biography"
                value={formData.biography}
                onChange={handleChange}
                rows="4"
                className="block w-full px-4 py-2 mt-2 text-[#7e5959] bg-white border border-[#a8a7a7] rounded-md focus:border-[#fbb4b3] focus:outline-none focus:ring"
                required
              ></textarea>
            </div>
            <div>
              <label className="text-[#7e5959]" htmlFor="hairColor">
                Hair Color
              </label>
              <select
                id="hairColor"
                name="hairColor"
                value={formData.hairColor}
                onChange={handleChange}
                className="block w-full px-4 py-2 mt-2 text-[#7e5959] bg-white border border-[#a8a7a7] rounded-md focus:border-[#fbb4b3] focus:outline-none focus:ring"
                required
              >
                <option value="">Select Hair Color</option>
                {dropdownData.haircolor.map((color) => (
                  <option key={color.id} value={color.id}>
                    {color.color}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-[#7e5959]" htmlFor="eyeColor">
                Eye Color
              </label>
              <select
                id="eyeColor"
                name="eyeColor"
                value={formData.eyeColor}
                onChange={handleChange}
                className="block w-full px-4 py-2 mt-2 text-[#7e5959] bg-white border border-[#a8a7a7] rounded-md focus:border-[#fbb4b3] focus:outline-none focus:ring"
                required
              >
                <option value="">Select Eye Color</option>
                {dropdownData.eyecolor.map((color) => (
                  <option key={color.id} value={color.id}>
                    {color.color}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-[#7e5959]" htmlFor="bodyType">
                Body Type
              </label>
              <select
                id="bodyType"
                name="bodyType"
                value={formData.bodyType}
                onChange={handleChange}
                className="block w-full px-4 py-2 mt-2 text-[#7e5959] bg-white border border-[#a8a7a7] rounded-md focus:border-[#fbb4b3] focus:outline-none focus:ring"
                required
              >
                <option value="">Select Body Type</option>
                {dropdownData.bodyshape.map((type) => (
                  <option key={type.id} value={type.id}>
                    {type.shape}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-[#7e5959]" htmlFor="height">
                Height (in cm)
              </label>
              <input
                id="height"
                type="number"
                name="height"
                value={formData.height}
                onChange={handleChange}
                className="block w-full px-4 py-2 mt-2 text-[#7e5959] bg-white border border-[#a8a7a7] rounded-md focus:border-[#fbb4b3] focus:outline-none focus:ring"
                required
              />
            </div>
            <div>
              <label className="text-[#7e5959]" htmlFor="weight">
                Weight (in kg)
              </label>
              <input
                id="weight"
                type="number"
                name="weight"
                value={formData.weight}
                onChange={handleChange}
                className="block w-full px-4 py-2 mt-2 text-[#7e5959] bg-white border border-[#a8a7a7] rounded-md focus:border-[#fbb4b3] focus:outline-none focus:ring"
                required
              />
            </div>
            <div>
              <label className="text-[#7e5959]" htmlFor="ethnicity">
                Ethnicity
              </label>
              <select
                id="ethnicity"
                name="ethnicity"
                value={formData.ethnicity}
                onChange={handleChange}
                className="block w-full px-4 py-2 mt-2 text-[#7e5959] bg-white border border-[#a8a7a7] rounded-md focus:border-[#fbb4b3] focus:outline-none focus:ring"
                required
              >
                <option value="">Select Ethnicity</option>
                {dropdownData.ethnicity.map((ethnicity) => (
                  <option key={ethnicity.id} value={ethnicity.id}>
                    {ethnicity.ethnicity}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-span-2">
              <label className="text-[#7e5959]" htmlFor="password">
                Password
              </label>
              <input
                id="password"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="block w-full px-4 py-2 mt-2 text-[#7e5959] bg-white border border-[#a8a7a7] rounded-md focus:border-[#fbb4b3] focus:outline-none focus:ring"
                required
              />
              {errors.password && (
                <p className="text-red-500">{errors.password}</p>
              )}
            </div>
            <div className="col-span-2">
              <label className="text-[#7e5959]" htmlFor="confirmPassword">
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="block w-full px-4 py-2 mt-2 text-[#7e5959] bg-white border border-[#a8a7a7] rounded-md focus:border-[#fbb4b3] focus:outline-none focus:ring"
                required
              />
              {errors.password && (
                <p className="text-red-500">{errors.password}</p>
              )}
            </div>
            <div className="col-span-2">
              <ReCAPTCHA
                sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
                onChange={handleRecaptchaChange}
              />
            </div>
          </div>
          <div className="flex justify-end mt-6">
            <button
              type="submit"
              className="px-4 py-2 text-white bg-[#d82553] rounded-md hover:bg-[#c21f4e]"
            >
              Register
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default RegistrationForm;
