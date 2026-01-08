use rand::distributions::{Alphanumeric, DistString};
use rand::Rng;
use std::time::{SystemTime, UNIX_EPOCH};

fn random_label() -> String {
    let mut rng = rand::thread_rng();
    let n: u32 = rng.gen_range(1..=9999);
    format!("job-{n:04}-{}", Alphanumeric.sample_string(&mut rng, 6).to_lowercase())
}

fn main() {
    let now = SystemTime::now()
        .duration_since(UNIX_EPOCH)
        .expect("time went backwards")
        .as_secs();

    println!("Epoch seconds: {now}");
    for _ in 0..5 {
        println!("{}", random_label());
    }
}



