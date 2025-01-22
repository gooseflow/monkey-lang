import { Token, tokens } from "../token/token.js";

export class Lexer {
    #input
    #position = 0 // curr pos in input (points to curr char)
    #readPosition = 0 // curr reading pos in input (after curr char)
    #ch // curr char under examination

    constructor(input) {
        this.#input = input;
        this.readChar();
    }

    readChar() {
        if (this.#readPosition >= this.#input.length) {
            this.#ch = 0;
        } else {
            this.#ch = this.#input[this.#readPosition];
        }

        this.#position = this.#readPosition;
        this.#readPosition += 1;
    }

    nextToken() {
        let tok = {};

        switch (this.#ch) {
            case "=":
                tok = this.newToken(tokens.ASSIGN, this.#ch);
                break;
            case ";":
                tok = this.newToken(tokens.SEMICOLON, this.#ch);
                break;
            case "(":
                tok = this.newToken(tokens.LPAREN, this.#ch);
                break;
            case ")":
                tok = this.newToken(tokens.RPAREN, this.#ch);
                break;
            case ",":
                tok = this.newToken(tokens.COMMA, this.#ch);
                break;
            case "+":
                tok = this.newToken(tokens.PLUS, this.#ch);
                break;
            case "{":
                tok = this.newToken(tokens.LBRACE, this.#ch);
                break;
            case "}":
                tok = this.newToken(tokens.RBRACE, this.#ch);
                break;
            case 0:
                tok = this.newToken(tokens.EOF, "");
                break;
        }

        this.readChar();
        return tok;
    }

    newToken(tokenType, ch) {
        return new Token(tokenType, String(ch));
    }
}

