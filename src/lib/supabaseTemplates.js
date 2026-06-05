import supabaseSchemaText from "../../supabase/schema.sql?raw";
import supabaseEnvText from "../../.env.example?raw";

export const SUPABASE_SCHEMA_TEXT = supabaseSchemaText;
export const SUPABASE_ENV_TEXT = supabaseEnvText;
export const SUPABASE_CHECKLIST_TEXT = [
  "1. Crea un proyecto en Supabase.",
  "2. Ejecuta el SQL de supabase/schema.sql.",
  "3. Pega la URL y la anon key en el panel Base de datos de VNDRX.",
  "4. Guarda y deja que la app recargue sola.",
  "5. Crea usuarios en Supabase Auth y asigna su rol en vndrx_user_roles.",
].join("\n");
