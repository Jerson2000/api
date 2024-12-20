import multer from "multer";
import fs from "fs";
import path from "path";

export class UploadUtil {
    mime_type: string;
    destination: string;
    allowedMimeType: string[];

    constructor(destination: string) {
        this.destination = destination;
        this.allowedMimeType = [];
    }

    private storage = multer.diskStorage({
        destination: (req, file, cb) => {            
            const dir = `./uploads/${this.destination}`;

            fs.access(dir, fs.constants.F_OK, (err) => {
                if (err) {
                    fs.mkdir(dir, { recursive: true }, (mkdirErr) => {
                        if (mkdirErr) {
                            return cb(mkdirErr, this.destination);
                        }
                        cb(null, dir);
                    });
                } else {
                    cb(null, dir);
                }
            });
        },
        filename: (req, file, cb) => {
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
            cb(null, uniqueSuffix + '-' + file.originalname);
        }
    });

    upload = multer({ storage: this.storage });
}


export enum UploadsDestinationEnum {
    PRODUCTS_UPLOAD = "products",
    AVATAR_UPLOAD = "avatar",
}