import { RSA, Crypt} from 'hybrid-crypto-js';

const entropy = 'Este es el mejor ecommerce de todos carajo';
const crypt = new Crypt({ entropy: entropy });
const rsa = new RSA({ entropy: entropy });

function encrypt(key, message) {
    return crypt.encrypt(key, message);
}

export default encrypt;