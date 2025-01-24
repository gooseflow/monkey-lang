export class Token {
    constructor(type, literal) {
        this.type = type;
        this.literal = literal;
    }
}

export const tokens = {
    ILLEGAL: "ILLEGAL",
    EOF: "EOF",

    // Identifiers + literals
    IDENT: "IDENT",
    INT: "INT",

    // Operators
    ASSIGN: "=",
    PLUS: "+",
    MINUS: "-",
    BANG: "!",
    ASTERISK: "*",
    SLASH: "/",
    LT: "<",
    GT: ">",

    // Delimiters
    COMMA: ",",
    SEMICOLON: ";",
    LPAREN: "(",
    RPAREN: ")",
    LBRACE: "{",
    RBRACE: "}",

    // Keywords
    FUNCTION: "FUNCTION",
    LET: "LET",
    TRUE: "TRUE",
    FALSE: "FALSE",
    IF: "IF",
    ELSE: "ELSE",
    RETURN: "RETURN"
}

const keywords = new Map([
    ["fn", tokens.FUNCTION],
    ["let", tokens.LET],
    ["true", tokens.TRUE],
    ["false", tokens.FALSE],
    ["if", tokens.IF],
    ["else", tokens.ELSE],
    ["return", tokens.RETURN]
]);

export function lookupIdent(ident) {
    return keywords.get(ident) || tokens.IDENT;
}

