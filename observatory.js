/**
 * @fileoverview Core OBSERVATORY Logic - V2.0 (Refactored)
 * Uses ComplexObservable pattern for state management.
 * WARNING: Legacy 'relay.js' dependencies have been removed.
 */

class ComplexObservable {
    constructor(initialValue) {
        this._val = initialValue;
        this._subs = new Set();
    }

    get value() { return this._val; }

    subscribe(fn) {
        this._subs.add(fn);
        fn(this._val); // Immediate fire
        return () => this._subs.delete(fn);
    }

    next(newVal) {
        this._val = newVal;
        this._subs.forEach(fn => fn(newVal));
    }
}

// --- STATE MANAGEMENT ---
const Store = {
    gridData: new ComplexObservable([]),
    timelineConfig: new ComplexObservable({ range: 24 }),
    telemetry: new ComplexObservable({
        noise: 0,
        gain: 0,
        azimuth: 0
    }),
    logs: new ComplexObservable([])
};

// --- DOM BINDINGS ---
// Critical: Updated IDs based on HTML refactor
const DOM = {
    grid: document.getElementById('data-grid-view'), 
    timeline: document.getElementById('temporal-vis-container'), 
    telemetry_grid: document.getElementById('telemetry-grid'),
    log_form: document.getElementById('log-form')
};

// --- LOGIC ---

function init() {
    console.log("Observatory V2 Initializing...");
    
    // Grid Subscription
    Store.gridData.subscribe(rows => {
        if (!DOM.grid) return;
        const tbody = DOM.grid.querySelector('tbody');
        if (!tbody) return;
        
        tbody.innerHTML = '';
        rows.forEach(row => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${row.target}</td>
                <td>${row.band}</td>
                <td>${row.priority}</td>
                <td>${row.window}</td>
                <td><button disabled>V2_Pending</button></td>
            `;
            tbody.appendChild(tr);
        });
    });

    // Telemetry Simulation (The "High Risk" Loop)
    setInterval(() => {
        const current = Store.telemetry.value;
        Store.telemetry.next({
            noise: Math.random() * 100,
            gain: current.gain + (Math.random() - 0.5),
            azimuth: (current.azimuth + 1) % 360
        });
        
        // Randomly inject grid data to simulate load
        if (Math.random() > 0.8) {
            const currentGrid = Store.gridData.value;
            const newRow = {
                target: `OBJ-${Math.floor(Math.random()*9000)+1000}`,
                band: ['Ku', 'Ka', 'S', 'X'][Math.floor(Math.random()*4)],
                priority: Math.floor(Math.random() * 5),
                window: `T+${Math.floor(Math.random()*60)}m`
            };
            Store.gridData.next([...currentGrid.slice(-4), newRow]);
        }
    }, 1000);

    // Timeline Visualization (Canvas)
    // NOTE: This is a simplified version of the old implementation
    if (DOM.timeline) {
        DOM.timeline.textContent = "Timeline V2 Visualization Placeholder";
        DOM.timeline.style.background = "linear-gradient(90deg, #111, #222)";
        DOM.timeline.style.color = "#888";
        DOM.timeline.style.padding = "20px";
    }
}

// Start
document.addEventListener('DOMContentLoaded', init);
