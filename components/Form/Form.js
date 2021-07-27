import styles from "./Form.module.css";
import { useContext, useState, useEffect } from "react";
import FormContext from "../../utils/Form/FormContext";
import Link from "next/link";

function Form() {
  const [dateArr, setDateArr] = useState([]);
  const FORM_DATA = {
    firstName: "",
    lastName: "",
    contactNumber: "",
    date: "",
    time: "",
    isCancelled: false,
  };
  const [formData, setFormData] = useState(FORM_DATA);
  const { handleSubmit, getTimeSlots, timeSlots } = useContext(FormContext);
  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const formSubmit = (e) => {
    e.preventDefault();
    handleSubmit(formData);
    setFormData(FORM_DATA);
  };

  const fetchAppointments = async () => {
    const res = await fetch("http://localhost:3000/api/time-slots");
    const data = await res.json();
    setDateArr(data.data);
  };
  console.log(timeSlots);
  useEffect(() => {
    fetchAppointments();
    getTimeSlots(dateArr, formData.date);
  }, [formData.date]);

  return (
    <form className={styles.form}>
      <Link href="/appointments">
        <button>appointments</button>
      </Link>
      <div className={styles.formGroup}>
        <label htmlFor="firstName" className={styles.formLabel}>
          First Name
        </label>
        <input
          type="text"
          name="firstName"
          className={styles.formInput}
          placeholder="Enter your first name"
          value={formData.firstName}
          onChange={handleChange}
          required
        />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="lastName" className={styles.formLabel}>
          Last Name
        </label>
        <input
          type="text"
          name="lastName"
          className={styles.formInput}
          placeholder="Enter your last name"
          value={formData.lastName}
          onChange={handleChange}
          required
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="contactNumber" className={styles.formLabel}>
          Contact No.
        </label>
        <div>
          <input
            type="tel"
            name="contactNumber"
            style={{ width: "20%" }}
            className={styles.formInput}
            placeholder="+63"
            disabled
          />
          <input
            type="tel"
            name="contactNumber"
            className={styles.formInput}
            placeholder="Enter your contact number"
            value={formData.contactNumber}
            onChange={handleChange}
            required
          />
        </div>
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="date" className={styles.formLabel}>
          Preferred Date
        </label>
        <input
          type="date"
          name="date"
          value={formData.date}
          className={styles.formInput}
          placeholder="Pick your preferred date"
          onChange={handleChange}
          required
        />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="time" className={styles.formLabel}>
          Preferred Time
        </label>
        <p className={styles.formLabelp}>
          *choose a preferred date before choosing your time to update the time
          slots options
        </p>
        <select name="time" onChange={handleChange} value={formData.time}>
          <option>Choose your preferred time </option>
          {timeSlots ? (
            timeSlots.map((timeSlot) => {
              return (
                <option key={timeSlot.time} value={timeSlot.time}>
                  {timeSlot.time} has {timeSlot.count} slot/s left.
                </option>
              );
            })
          ) : (
            <option>Choose your preferred time</option>
          )}
        </select>
      </div>

      <button type="submit" className={styles.formButton} onClick={formSubmit}>
        Submit
      </button>
    </form>
  );
}

export default Form;
