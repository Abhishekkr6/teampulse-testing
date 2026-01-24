import random
import time
import sys
import threading

# ANSI Colors for terminal output
class Colors:
    HEADER = '\033[95m'
    BLUE = '\033[94m'
    CYAN = '\033[96m'
    GREEN = '\033[92m'
    WARNING = '\033[93m'
    FAIL = '\033[91m'
    ENDC = '\033[0m'
    BOLD = '\033[1m'
    UNDERLINE = '\033[4m'

class CelestialBody:
    def __init__(self, name, type_):
        self.name = name
        self.type = type_
        self.mass = random.uniform(0.1, 100.0)
        self.stability = 100.0

    def evolve(self):
        decay = random.uniform(0, 5)
        self.stability -= decay
        return decay

    def __str__(self):
        color = Colors.CYAN if self.type == "Star" else Colors.BLUE
        return f"{color}{self.type} {self.name}{Colors.ENDC} (Mass: {self.mass:.2f}, Stability: {self.stability:.1f}%)"

class Universe:
    def __init__(self):
        self.age = 0
        self.entropy = 0.0
        self.energy = 10000.0
        self.bodies = []
        self.is_running = True
        self.event_log = []

    def big_bang(self):
        print(f"{Colors.HEADER}{Colors.BOLD}=== THE BIG BANG ==={Colors.ENDC}")
        time.sleep(1)
        print("Energy expanding...")
        time.sleep(1)
        for i in range(5):
            self.create_body(initial=True)
        print(f"{Colors.GREEN}Universe Stabilized.{Colors.ENDC}\n")

    def create_body(self, initial=False):
        names = ["Alpha", "Beta", "Gamma", "Delta", "Epsilon", "Zeta", "Eta", "Theta", "Iota", "Kappa"]
        types = ["Star", "Planet", "Nebula", "Black Hole"]
        
        name = f"{random.choice(names)}-{random.randint(100, 999)}"
        type_ = random.choice(types)
        body = CelestialBody(name, type_)
        self.bodies.append(body)
        
        if not initial:
            self.log_event(f"New body formed: {body}")

    def log_event(self, message):
        timestamp = f"[Age: {self.age} BY]"
        self.event_log.append(f"{timestamp} {message}")
        print(f"{Colors.BOLD}{timestamp}{Colors.ENDC} {message}")

    def inject_energy(self):
        amount = 500
        self.energy += amount
        self.entropy = max(0, self.entropy - 50)
        self.log_event(f"{Colors.GREEN}>>> DIVINE INTERVENTION: {amount} Energy Injected. Entropy Reduced.{Colors.ENDC}")

    def induce_chaos(self):
        self.entropy += 100
        if self.bodies:
            victim = random.choice(self.bodies)
            self.bodies.remove(victim)
            self.log_event(f"{Colors.FAIL}>>> CHAOS EVENT: {victim.name} was destroyed!{Colors.ENDC}")

    def step(self):
        self.age += 1
        entropy_increase = random.uniform(1, 10)
        self.entropy += entropy_increase
        self.energy -= entropy_increase * 0.5

        # Evolution of bodies
        for body in self.bodies[:]:
            decay = body.evolve()
            if body.stability <= 0:
                self.bodies.remove(body)
                self.log_event(f"{Colors.WARNING}{body.name} has collapsed into dust.{Colors.ENDC}")

        # Random Events
        if random.random() < 0.2:
            self.create_body()
        
        if self.entropy > 1000 or self.energy <= 0:
            self.heat_death()

    def heat_death(self):
        print(f"\n{Colors.FAIL}{Colors.BOLD}=== HEAT DEATH IMMINENT ==={Colors.ENDC}")
        print(f"Final Age: {self.age} Billion Years")
        print(f"Total Entropy: {self.entropy:.2f}")
        print("The universe has faded into darkness...")
        self.is_running = False

    def status_report(self):
        print(f"\n{Colors.HEADER}--- Universe Status (Age: {self.age} BY) ---{Colors.ENDC}")
        print(f"Energy: {self.energy:.2f} | Entropy: {self.entropy:.2f}")
        print(f"Celestial Bodies: {len(self.bodies)}")
        print("-----------------------------------")

def input_listener(universe):
    while universe.is_running:
        cmd = input()
        if cmd.strip().lower() == "inject":
            universe.inject_energy()
        elif cmd.strip().lower() == "chaos":
            universe.induce_chaos()
        elif cmd.strip().lower() == "quit":
            universe.is_running = False
            print("Exiting simulation...")
            break
        elif cmd.strip().lower() == "help":
             print(f"{Colors.HEADER}Commands: inject, chaos, quit{Colors.ENDC}")

def main():
    u = Universe()
    u.big_bang()

    # Start input thread
    t = threading.Thread(target=input_listener, args=(u,))
    t.daemon = True
    t.start()
    
    print(f"{Colors.HEADER}Controls: Type 'inject' to add energy, 'chaos' to destroy, 'quit' to exit.{Colors.ENDC}")
    time.sleep(2)

    while u.is_running:
        u.step()
        u.status_report()
        time.sleep(2)

if __name__ == "__main__":
    try:
        main()
    except KeyboardInterrupt:
        print("\nSimulation stopped by user.")
