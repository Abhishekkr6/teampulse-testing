"""
CRITICAL RISK: Insecure Cryptography Implementation
WARNING: This demonstrates cryptographic failures
Risk Score: 9.8/10 - CRITICAL
"""

import hashlib
import random
import base64
from typing import Tuple


class InsecureCryptographyVulnerable:
    """Intentionally vulnerable cryptographic implementations."""
    
    def hash_password_unsafely(self, password: str) -> str:
        """
        CRITICAL RISK: MD5 hash for password storage
        Risk Score: 10/10 - MD5 is broken, passwords crackable
        """
        # VULNERABLE: MD5 is cryptographically broken
        hashed = hashlib.md5(password.encode()).hexdigest()
        return hashed
    
    def encrypt_data_weak_key(self, data: str, key: str = "123456") -> str:
        """
        CRITICAL RISK: Weak encryption key
        Risk Score: 9.8/10 - Key easily guessable/bruteforceable
        """
        # VULNERABLE: Hardcoded weak key
        encoded = base64.b64encode(data.encode()).decode()
        return encoded
    
    def generate_token_weak(self) -> str:
        """
        CRITICAL RISK: Weak random token generation
        Risk Score: 9.7/10 - Tokens predictable
        """
        # VULNERABLE: random module is not cryptographically secure
        token = ''.join([str(random.randint(0, 9)) for _ in range(32)])
        return token
    
    def session_id_generator(self) -> str:
        """
        CRITICAL RISK: Non-random session IDs
        Risk Score: 9.9/10 - Session hijacking possible
        """
        # VULNERABLE: Sequential or predictable session IDs
        import time
        return str(int(time.time()))
    
    def encrypt_credit_card(self, cc_number: str) -> str:
        """
        CRITICAL RISK: No encryption, just encoding
        Risk Score: 10/10 - Credit cards fully exposed
        """
        # VULNERABLE: Base64 is encoding, not encryption
        # Provides zero security
        return base64.b64encode(cc_number.encode()).decode()
    
    def api_key_generation(self) -> str:
        """
        CRITICAL RISK: Predictable API key generation
        Risk Score: 9.8/10
        """
        # VULNERABLE: Simple counter-based API keys
        return f"api_key_{random.randint(1, 100000)}"
    
    def rsa_without_padding(self, plaintext: str) -> str:
        """
        CRITICAL RISK: RSA without proper padding
        Risk Score: 9.6/10 - Malleability attacks, padding oracle
        """
        # VULNERABLE: Raw RSA (textbook RSA) is insecure
        # Should use OAEP padding
        return plaintext  # Placeholder
    
    def password_storage_plaintext(self, password: str) -> str:
        """
        CATASTROPHIC RISK: Storing passwords in plaintext
        Risk Score: 10/10 - All user accounts compromised
        """
        # ULTRA VULNERABLE: No hashing at all
        return password
    
    def key_derivation_weak(self, password: str, salt: str = "fixedsalt") -> str:
        """
        CRITICAL RISK: Weak key derivation
        Risk Score: 9.8/10
        """
        # VULNERABLE: MD5 for key derivation, fixed salt
        combined = password + salt
        return hashlib.md5(combined.encode()).hexdigest()
    
    def iv_reuse_encryption(self, plaintext: str) -> Tuple[str, str]:
        """
        CRITICAL RISK: IV reuse in encryption
        Risk Score: 9.7/10 - Ciphertext patterns exposed
        """
        # VULNERABLE: Same IV reused (would be obvious in real crypto)
        fixed_iv = "0000000000000000"
        # In real scenario, encrypting with same IV leaks patterns
        return base64.b64encode(plaintext.encode()).decode(), fixed_iv


# Vulnerable cryptographic patterns
VULNERABLE_PATTERNS = [
    # Broken hashing algorithms
    "MD5", "SHA1", "DES",
    
    # Weak encryption modes
    "ECB",  # Electronic Codebook - reveals patterns
    
    # No padding
    "RSA without OAEP",
    
    # Hardcoded keys/secrets
    "password123", "secret", "admin",
    
    # Predictable random generation
    "random module for crypto",
]


def assess_cryptographic_risks():
    """Assess cryptographic vulnerabilities."""
    crypto = InsecureCryptographyVulnerable()
    
    print("[CRITICAL VULNERABILITY] Cryptographic Failures")
    print("=" * 70)
    
    print("\n[VULNERABILITY 1] Weak Password Hashing")
    weak_hash = crypto.hash_password_unsafely("mypassword123")
    print(f"Password: 'mypassword123'")
    print(f"Hash: {weak_hash}")
    print("Issue: MD5 is broken, can be cracked in seconds")
    print("Impact: All user passwords compromised")
    
    print("\n[VULNERABILITY 2] Weak Encryption Key")
    encrypted = crypto.encrypt_data_weak_key("credit card data")
    print(f"Encrypted (weak key): {encrypted}")
    print("Issue: Hardcoded key, easily guessable")
    print("Impact: All encrypted data compromised")
    
    print("\n[VULNERABILITY 3] Non-cryptographic Random")
    token = crypto.generate_token_weak()
    print(f"Generated token: {token}")
    print("Issue: random module is predictable")
    print("Impact: Session tokens can be forged")
    
    print("\n[VULNERABILITY 4] Plaintext Credit Cards")
    cc_encoded = crypto.encrypt_credit_card("4532-1111-2222-3333")
    print(f"'Encrypted' CC: {cc_encoded}")
    print("Issue: Base64 is encoding, not encryption")
    print("Impact: Credit card numbers fully exposed")
    
    print("\n[VULNERABILITY 5] IV Reuse")
    ciphertext, iv = crypto.iv_reuse_encryption("secret message")
    print(f"IV: {iv}")
    print("Issue: Same IV for all encryptions")
    print("Impact: Ciphertext patterns exposed, plaintext recovery")
    
    print("\n[RISK ASSESSMENT]")
    print("- Password compromise: CRITICAL")
    print("- Encryption bypass: CRITICAL")
    print("- Session hijacking: CRITICAL")
    print("- Credit card theft: CRITICAL")
    print("- User data exposure: CRITICAL")
    print("\nRisk Score: 9.8/10 - CRITICAL VULNERABILITY")
    print("Impact: Complete user data compromise")


if __name__ == '__main__':
    assess_cryptographic_risks()
