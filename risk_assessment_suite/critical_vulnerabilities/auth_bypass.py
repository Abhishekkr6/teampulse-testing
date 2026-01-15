"""
CRITICAL RISK: Authentication & Authorization Bypass
WARNING: This demonstrates authentication flaws
Risk Score: 9.8/10 - CRITICAL
"""

from typing import Optional, Dict, List


class AuthenticationBypassVulnerable:
    """Intentionally vulnerable authentication mechanisms."""
    
    def __init__(self):
        self.users = {
            "admin": "admin123",
            "user": "password"
        }
        self.sessions = {}
    
    def login_hardcoded_credentials(self, username: str, password: str) -> bool:
        """
        CRITICAL RISK: Hardcoded credentials
        Risk Score: 9.9/10 - Instant login bypass
        """
        # VULNERABLE: Credentials stored in code
        return username in self.users and self.users[username] == password
    
    def check_authentication_via_cookie(self, username: str) -> bool:
        """
        CRITICAL RISK: Only checking if username cookie exists
        Risk Score: 9.8/10 - Anyone can set cookie
        """
        # VULNERABLE: No signature or validation of cookie
        # Attacker can set cookie: "username=admin"
        return True
    
    def bypass_via_null_password(self, username: str, password: str) -> bool:
        """
        CRITICAL RISK: Null password bypass
        Risk Score: 9.9/10
        """
        # VULNERABLE: Empty password check
        if password == "":
            return True  # Anyone can login with empty password
        return self.users.get(username) == password
    
    def authentication_via_header(self, auth_header: str) -> bool:
        """
        CRITICAL RISK: Trusting client-side authentication
        Risk Score: 10/10 - Trivial to bypass
        """
        # VULNERABLE: Client-supplied auth header
        # Attacker sets: "Authorization: Admin"
        return auth_header == "Admin"
    
    def admin_check_via_parameter(self, user_data: Dict) -> bool:
        """
        CRITICAL RISK: Trusting client-supplied admin flag
        Risk Score: 9.9/10 - Privilege escalation
        """
        # VULNERABLE: Client can set is_admin flag
        return user_data.get("is_admin", False)
    
    def session_fixation_vulnerability(self, session_id: str) -> Dict:
        """
        CRITICAL RISK: Session fixation vulnerability
        Risk Score: 9.6/10 - Session hijacking
        """
        # VULNERABLE: Using attacker-supplied session ID
        self.sessions[session_id] = {"username": "attacker", "authenticated": True}
        return self.sessions[session_id]
    
    def weak_password_policy(self) -> Dict:
        """
        CRITICAL RISK: No password policy enforcement
        Risk Score: 9.4/10 - Brute force attacks possible
        """
        return {
            "min_length": 0,  # No minimum length
            "max_length": 999,  # No maximum length
            "require_uppercase": False,
            "require_lowercase": False,
            "require_numbers": False,
            "require_special": False,
            "password_expiry_days": 999999,  # Never expires
        }
    
    def account_enumeration_vulnerability(self, username: str) -> str:
        """
        CRITICAL RISK: Different error messages for existing/non-existing users
        Risk Score: 8.8/10 - Account enumeration
        """
        if username in self.users:
            return "Invalid password"  # User exists
        else:
            return "User not found"  # User doesn't exist
        # Attacker can enumerate all users
    
    def no_rate_limiting(self, username: str, password: str, attempts: int) -> bool:
        """
        CRITICAL RISK: No brute force protection
        Risk Score: 9.5/10 - Password guessing possible
        """
        # VULNERABLE: Unlimited login attempts
        for _ in range(attempts):
            if self.users.get(username) == password:
                return True
        return False
    
    def insecure_password_reset(self, email: str, reset_token: str) -> bool:
        """
        CRITICAL RISK: Guessable password reset token
        Risk Score: 9.7/10 - Account takeover via reset
        """
        # VULNERABLE: Sequential or guessable tokens
        expected_token = str(hash(email))  # Predictable
        return reset_token == expected_token


# Authentication bypass attack vectors
BYPASS_VECTORS = [
    # Credential attacks
    "Brute force",
    "Dictionary attack",
    "Default credentials",
    
    # Token/Session attacks
    "Session fixation",
    "Session prediction",
    "Token reuse",
    
    # Logic flaws
    "Null password bypass",
    "Type juggling",
    "Boolean flip",
    
    # Client-side bypasses
    "Cookie manipulation",
    "Header manipulation",
    "Client-side validation bypass",
    
    # Privilege escalation
    "Horizontal privilege escalation",
    "Vertical privilege escalation",
    
    # Account takeover
    "Weak password reset",
    "Account enumeration",
    "Insecure direct object reference",
]


def demonstrate_auth_bypass_attacks():
    """Demonstrate authentication bypass attacks."""
    auth = AuthenticationBypassVulnerable()
    
    print("[CRITICAL] Authentication & Authorization Bypass")
    print("=" * 70)
    
    print("\n[ATTACK 1] Client-Side Admin Flag Bypass")
    print("Attack: Modify client data to set is_admin=true")
    user_data = {"username": "attacker", "is_admin": True}
    print(f"User data: {user_data}")
    print(f"Is admin: {auth.admin_check_via_parameter(user_data)}")
    print("Result: Instant privilege escalation")
    
    print("\n[ATTACK 2] Cookie-Based Authentication Bypass")
    print("Attack: Set cookie with admin username")
    print("Cookie: username=admin")
    result = auth.check_authentication_via_cookie("admin")
    print(f"Authenticated: {result}")
    print("Result: Bypass authentication completely")
    
    print("\n[ATTACK 3] Null Password Bypass")
    print("Attack: Submit empty password")
    result = auth.bypass_via_null_password("admin", "")
    print(f"Login with empty password: {result}")
    print("Result: Any account accessible without knowing password")
    
    print("\n[ATTACK 4] Account Enumeration")
    print("Trying to detect valid accounts...")
    for username in ["admin", "nonexistent"]:
        try:
            msg = auth.account_enumeration_vulnerability(username)
            print(f"Username '{username}': {msg}")
        except:
            pass
    print("Result: All valid usernames discovered")
    
    print("\n[ATTACK 5] Brute Force (No Rate Limiting)")
    print("Attempting 1000 password guesses...")
    result = auth.no_rate_limiting("user", "password", 1000)
    print(f"Attack successful after 1000 attempts: {result}")
    print("Result: Password cracked without protection")
    
    print("\n[RISK ASSESSMENT]")
    print("- Authentication bypass: CRITICAL")
    print("- Privilege escalation: CRITICAL")
    print("- Account takeover: CRITICAL")
    print("- Brute force attack possible: YES")
    print("- No protection mechanisms: YES")
    print("\nRisk Score: 9.8/10 - CRITICAL VULNERABILITY")
    print("Impact: Complete system access")


if __name__ == '__main__':
    demonstrate_auth_bypass_attacks()
