mod substring;

fn main() {
    let s = "Hello, World!";

    let substring = substring::find_substring(s, "World");
    println!("substring: {:?}", substring);

    let new_string = substring::replace_substring(s, "World", "Rust");
    println!("New string: {}", new_string);
}
