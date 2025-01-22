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
}
