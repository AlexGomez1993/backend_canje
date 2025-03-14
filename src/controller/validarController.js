import nodemailer from "nodemailer";
import { Cliente } from "../models/index.js";
import bcrypt from "bcryptjs";
import crypto from "crypto";

const validarMail = async (req, res) => {
    try {
        const { correo, ruc } = req.body;

        const clienteExistente = await Cliente.findOne({
            where: {
                email: correo,
                ruc: ruc,
                estado: 3,
            },
        });

        if (!clienteExistente) {
            return res.status(404).json({ msg: "Cliente no encontrado" });
        }
        const codigo = crypto
            .createHash("md5")
            .update(correo.split("@")[0])
            .digest("hex");
        const contenido = `
            <table style="width:100%; border:2px solid #cacaca; border-collapse:collapse;">
                <tr>
                    <td style="text-align:center; vertical-align:middle; border-bottom:2px solid #cacaca;">
                        <h2><strong>Sistema de canjes</strong></h2>
                    </td>
                </tr>
                <tr>
                    <td style="text-align:center;">
                        <br>
                        <br>
                        <strong>Estimado(a): ${clienteExistente.nombre} ${clienteExistente.apellidos}</strong>
                    </td>
                </tr>
                <tr>
                    <td>
                        <br>
                        <br>
                        Te adjuntamos la información para que procedas con el cambio de contraseña de tu cuenta:
                        <br>
                        <br>
                    </td>
                </tr>
                <tr>
                    <td>
                        <br>
                        <br>
                        <strong>Código: ${codigo}</strong>
                        <br>
                        <br>
                        * Copia este código y pégalo en el formulario de cambio de contraseña.
                    </td>
                </tr>
                <tr>
                    <td style="text-align:center;">
                        <br>
                        <br>
                        <strong>Este mensaje se ha generado automáticamente, favor no responder al mismo.</strong>
                        <br>
                        <br>
                    </td>
                </tr>
            </table>
        `;

        const transporter = nodemailer.createTransport({
            host: "mail.plazapomasqui.com",
            port: 465,
            secure: true,
            auth: {
                user: "scalacanjes@plazapomasqui.com",
                pass: "tqom]@S#u3G1",
            },
        });

        const mailOptions = {
            from: "scalacanjes@plazapomasqui.com",
            to: clienteExistente.email,
            subject: "Cambio de contraseña",
            html: contenido,
        };

        await transporter.sendMail(mailOptions);

        return res.status(200).json({
            msg: "Correo enviado correctamente",
        });
    } catch (error) {
        console.error("Error al enviar el correo:", error);
        return res.status(500).json({ msg: "Error al procesar la solicitud" });
    }
};

const cambiarContrasena = async (req, res) => {
    try {
        const { correo, ruc, codigo, nuevaContrasena } = req.body;

        const clienteExistente = await Cliente.findOne({
            where: {
                email: correo,
                ruc: ruc,
                estado: 3,
            },
        });

        if (!clienteExistente) {
            return res.status(404).json({ msg: "Cliente no encontrado" });
        }

        const codigoBase = crypto
            .createHash("md5")
            .update(clienteExistente.email.split("@")[0])
            .digest("hex");

        if (codigo == codigoBase) {
            clienteExistente.contrasena =
                nuevaContrasena || clienteExistente.contrasena;
        }

        await clienteExistente.save();

        return res.status(200).json({
            msg: `Contraseña actualizada correctamente`,
            cliente: clienteExistente.nombre,
            id: clienteExistente.id,
        });
    } catch (error) {
        console.error("Error al cambiar la contraseña del cliente:", error);
        return res.status(500).json({ msg: "Error al procesar la solicitud" });
    }
};

export { validarMail, cambiarContrasena };
