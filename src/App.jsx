import { useEffect, useRef, useState } from "react";

const letters = "abcdefghijklmnopqrstuvwxyz";
const numbers = "0123456789";
const symbols = "!@#$%^&*()-_=+[]{}|;:'\\\",.<>?/`~";

function App() {
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [experience, setExperience] = useState("");
  const descriptionRef = useRef(null);
  const nameRef = useRef(null);
  const [errors, setErrors] = useState({});

  // Al mount del componente, imposta automaticamente il focus sull'input del nome
  useEffect(() => {
    nameRef.current.focus();
  }, []);

  // Validazione username
  const validateUsername = (value) => {
    if (value.trim().length < 6) {
      return "Username troppo corto";
    }

    for (let char of value) {
      if (
        !letters.includes(char.toLowerCase()) &&
        !numbers.includes(char)
      ) {
        return "Inserisci solo caratteri alfanumerici";
      }
    }

    return "";
  };

  // Validazione password
  const validatePassword = (value) => {
    if (value.trim().length < 8) {
      return "Minimo 8 caratteri";
    }

    let hasLetter = false;
    let hasNumber = false;
    let hasSymbol = false;

    for (let char of value) {
      if (letters.includes(char.toLowerCase())) {
        hasLetter = true;
      } else if (numbers.includes(char)) {
        hasNumber = true;
      } else if (symbols.includes(char)) {
        hasSymbol = true;
      }
    }

    if (!hasLetter || !hasNumber || !hasSymbol) {
      return "Inserisci almeno una lettera, un numero e un simbolo";
    }

    return "";
  };

  // Validazione descrizione
  const validateDescription = (value) => {

    if (value.trim().length < 100 || value.trim().length > 1000) {
      return "Inserisci una descrizione tra i 100 e i 1000 caratteri";
    }

    return "";
  };

  // Funzione che gestisce il submit
  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {
      fullName: fullName ? "" : "Inserisci un nome",
      username: validateUsername(username),
      password: validatePassword(password),
      specialization: specialization
        ? ""
        : "Seleziona una specializzazione",
      experience:
        Number(experience) > 0
          ? ""
          : "Inserisci almeno un anno di esperienza",
      description: validateDescription(descriptionRef.current.value),
    };

    setErrors(newErrors);

    const hasErrors = Object.values(newErrors).some(
      (error) => error !== ""
    );

    if (!hasErrors) {
      console.log({
        fullName,
        username,
        password,
        specialization,
        experience,
        description: descriptionRef.current.value
      });
    }
  };

  // Reset form
  const resetForm = () => {
    setFullName("");
    setUsername("");
    setPassword("");
    setSpecialization("");
    setExperience("");
    setErrors({});
    descriptionRef.current.value = "";
  };

  // Reference al form
  const formRef = useRef();


  return (
    <div className="container">
      <h1>Web Developer Signup</h1>

      {/* Form */}
      <form onSubmit={handleSubmit} ref={formRef}>
        {/* Input nome completo */}
        <input
          className="input"
          type="text"
          placeholder="Nome completo"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          ref={nameRef}
        />

        {errors.fullName && (
          <p className="error">{errors.fullName}</p>
        )}

        {/* Input username */}
        <input
          className="input"
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);

            setErrors({
              ...errors,
              username: validateUsername(e.target.value),
            });
          }}
        />

        {errors.username ? (
          <p className="error">{errors.username}</p>
        ) : (
          username && <p className="success">Username valido</p>
        )}

        {/* Input password */}
        <input
          className="input"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);

            setErrors({
              ...errors,
              password: validatePassword(e.target.value),
            });
          }}
        />

        {errors.password ? (
          <p className="error">{errors.password}</p>
        ) : (
          password && <p className="success">Password valida</p>
        )}

        {/* Select specializzazioni */}
        <select
          className="input"
          value={specialization}
          onChange={(e) => setSpecialization(e.target.value)}
        >
          <option value="">Seleziona specializzazione</option>
          <option value="Full Stack">Full Stack</option>
          <option value="Frontend">Frontend</option>
          <option value="Backend">Backend</option>
        </select>

        {errors.specialization && (
          <p className="error">{errors.specialization}</p>
        )}

        {/* Input anni di esperienza */}
        <input
          className="input"
          type="number"
          placeholder="Anni di esperienza"
          value={experience}
          onChange={(e) => setExperience(e.target.value)}
        />

        {errors.experience && (
          <p className="error">{errors.experience}</p>
        )}

        {/* Input descrizione */}
        <textarea
          className="input textarea"
          placeholder="Descrizione sviluppatore"
          ref={descriptionRef}
          onChange={(e) => {
            setErrors({
              ...errors,
              description: validateDescription(e.target.value),
            });
          }}
        ></textarea>

        {errors.description ? (
          <p className="error">{errors.description}</p>
        ) : (
          descriptionRef.current?.value && (
            <p className="success">Descrizione valida</p>
          )
        )}

        {/* Bottoni */}
        <button className="btn" type="submit">
          Registrati
        </button>

        <button
          className="btn reset-btn"
          type="button"
          onClick={resetForm}
        >
          Reset
        </button>
      </form>

      <button
        className="scroll-top"
        onClick={() => {
          formRef.current.scrollIntoView({ behavior: "smooth" });
        }}>
        ↑
      </button>
    </div>
  );
}

export default App;