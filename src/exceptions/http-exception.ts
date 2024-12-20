export enum HTTPErrorStatusCode {
    BAD_REQUEST = 400,                   // Bad Request
    UNAUTHORIZED = 401,                 // Unauthorized
    PAYMENT_REQUIRED = 402,              // Payment Required
    FORBIDDEN = 403,                    // Forbidden
    NOT_FOUND = 404,                     // Not Found
    METHOD_NOT_ALLOWED = 405,             // Method Not Allowed
    NOT_ACCEPTABLE = 406,                // Not Acceptable
    PROXY_AUTHENTICATION_REQUIRED = 407,  // Proxy Authentication Required
    REQUEST_TIMEOUT = 408,               // Request Timeout
    CONFLICT = 409,                     // Conflict
    GONE = 410,                         // Gone
    LENGTH_REQUIRED = 411,               // Length Required
    PRECONDITION_FAILED = 412,           // Precondition Failed
    PAYLOAD_TOO_LARGE = 413,              // Payload Too Large
    URI_TOO_LONG = 414,                   // URI Too Long
    UNSUPPORTED_MEDIA_TYPE = 415,         // Unsupported Media Type
    RANGE_NOT_SATISFIABLE = 416,          // Range Not Satisfiable
    EXPECTATION_FAILED = 417,            // Expectation Failed
    MISDIRECTED_REQUEST = 421,           // Misdirected Request
    UNPROCESSABLE_ENTITY = 422,          // Unprocessable Entity
    LOCKED = 423,                       // Locked
    FAILED_DEPENDENCY = 424,             // Failed Dependency
    UPGRADE_REQUIRED = 426,              // Upgrade Required
    PRECONDITION_REQUIRED = 428,         // Precondition Required
    TOO_MANY_REQUESTS = 429,              // Too Many Requests
    REQUEST_HEADER_FIELDS_TOO_LARGE = 431,  // Request Header Fields Too Large
    UNAVAILABLE_FOR_LEGAL_REASONS = 451,   // Unavailable For Legal Reasons
    INTERNAL_SERVER_ERROR = 500,          // Internal Server Error
    NOT_IMPLEMENTED = 501,                // Not Implemented
    BAD_GATEWAY = 502,                   // Bad Gateway
    SERVICE_UNAVAILABLE = 503,           // Service Unavailable
    GATEWAY_TIMEOUT = 504,               // Gateway Timeout
    HTTP_VERSION_NOT_SUPPORTED = 505       // HTTP Version Not Supported
}






export class HTTPException extends Error {
    message: string;
    statusCode: number;
    errors: any;

    constructor(message: string, statusCode: number, errors: any) {
        super(message)
        this.message = message;
        this.statusCode = statusCode;
        this.errors = errors;
    }
}

export class ConflictException extends HTTPException {
    constructor(message: string, errors?: any) {
        super(message, HTTPErrorStatusCode.CONFLICT, errors)
    }
}

export class ForbiddenException extends HTTPException {
    constructor(message: string, errors?: any) {
        super(message, HTTPErrorStatusCode.FORBIDDEN, errors)
    }
}

export class NotFoundException extends HTTPException {
    constructor(message: string, errors?: any) {
        super(message, HTTPErrorStatusCode.NOT_FOUND, errors)
    }
}

export class UnauthorizedException extends HTTPException {
    constructor(message: string, errors?: any) {
        super(message, HTTPErrorStatusCode.UNAUTHORIZED, errors)
    }
}

export class BadRequestException extends HTTPException {
    constructor(message: string, errors?: any) {
        super(message, HTTPErrorStatusCode.BAD_REQUEST, errors)
    }
}

export class InternalException extends HTTPException{
    constructor(message: string, errors?: any) {
        super(message, HTTPErrorStatusCode.INTERNAL_SERVER_ERROR, errors)
    }
}
