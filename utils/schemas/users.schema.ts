import { create } from "domain";
import { createZodDto } from "nestjs-zod";
import { z } from "zod";

const credentialSchemaLogin = z.object({
    email: z.string().email(),
    password: z.string().min(6)
});
const credentialSchemaCreate = z.object({
    email: z.string().email(),
    password: z.string().min(6),
    passwordConfirm: z.string().min(6)
}).refine((data) => data.password === data.passwordConfirm, {
    message: "Passwords do not match",
    path: ["passwordConfirm"],
});


export class CredentialsDtoLogin extends createZodDto(credentialSchemaLogin){}
export class CredentialDtoCreate extends createZodDto(credentialSchemaCreate){}