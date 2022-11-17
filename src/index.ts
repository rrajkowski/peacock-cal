import express, { Application, Request, Response } from "express";

const app: Application = express();
const port = process.env.PORT || '3000';

// Body parsing Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get(
    "/",
    async (req: Request, res: Response): Promise<Response> => {
        return res.status(200).send({
            message: "Hello Cal API!",
        });
    }
);
app.get(
    "/send",
    async (req: Request, res: Response): Promise<Response> => {
        return res.status(200).send({
            message: "Created and sent .ics and emailed recipients!",
        });
    }
);

try {
    app.listen(port, (): void => {
        console.log(`Connected successfully on port ${port}`);
    });
} catch (error: any) {
    console.error(`Error occurred: ${error.message}`);
}
