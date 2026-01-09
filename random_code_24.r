# Random code generator (R)
generate_random_code <- function(length = 10) {
  chars <- unlist(strsplit("0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ", ""))
  paste0(sample(chars, length, replace = TRUE), collapse = "")
}

cat("Random Code Generator\n")
cat(strrep("=", 20), "\n\n", sep = "")

for (i in 1:5) {
  code <- generate_random_code(12)
  cat(sprintf("Code #%d: %s\n", i, code))
}

timestamp <- format(Sys.time(), "%Y-%m-%d %H:%M:%S")
cat("\nGenerated at: ", timestamp, "\n", sep = "")



