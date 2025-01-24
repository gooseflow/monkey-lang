import { createInterface } from "node:readline";
import { Lexer } from "../lexer/lexer.js";
import { tokens } from "../token/token.js";

export class Repl {
    #rl;
    #lexer;

    constructor() {
        this.#rl = createInterface({
            input: process.stdin,
            output: process.stdout,
            prompt: "> "
        });
    }

    parseTokens() {
        this.#rl.prompt();

        this.#rl.on('line', (input) => {
            this.#lexer = new Lexer(input);

            let nextToken = this.#lexer.nextToken();
            while (nextToken.type !== tokens.EOF) {
                console.log(nextToken);
                nextToken = this.#lexer.nextToken();
            }

            this.#rl.prompt();
        });

        this.#rl.on('close', () => {
            console.log('Exiting REPL!');
            process.exit(0);
        });
    }
}

