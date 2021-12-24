import { useState, useEffect } from "react";
import Select from "react-select";

const options = [
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" },
];

const AsignarCliente = () => {
  const [clientes, setClientes] = useState([]);

  // cada vez que cambia sabores, se ejecuta el useEffect
  useEffect(() => {
    console.log("clientes", clientes);
  }, [clientes]);

  const seleccionarCliente = (values) => {
    setClientes(values);
  };

  return (
    <>
      <h1>Asignar cliente</h1>
      <Select
        instanceId="clientes"
        options={options}
        isMulti={true}
        onChange={seleccionarCliente}
      />
    </>
  );
};

export default AsignarCliente;
