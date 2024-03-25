import * as yup from "yup";

import { yupResolver } from "@hookform/resolvers/yup";

export const signinSchema = yup.object().shape({
  email: yup.string().email("Ingrese un email válido").required("El email es requerido"),
  password: yup.string().required("La contraseña es requerida"),
});

export const signinResolver = yupResolver(signinSchema);
