pub fn find_substring<'a>(s: &'a str, substring: &str) -> Option<&'a str> {
    s.find(substring).map(|index| &s[index..index + substring.len()])
}

pub fn replace_substring(s: &str, from: &str, to: &str) -> String {
    s.replace(from, to)
}

#[cfg(test)]
mod tests {
    use super::{find_substring, replace_substring};

    #[test]
    fn test_find_substring() {
        assert_eq!(find_substring("hello", "ll"), Some("ll"));
        assert_eq!(find_substring("hello", "world"), None);
    }

    #[test]
    fn test_replace_substring() {
        assert_eq!(replace_substring("hello", "ll", "ww"), "hewwo");
        assert_eq!(replace_substring("hello", "world", "ww"), "hello");
    }
}
