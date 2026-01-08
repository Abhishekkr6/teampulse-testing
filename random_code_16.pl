#!/usr/bin/perl
use strict;
use warnings;

# Random code generator
sub generate_random_code {
    my $length = shift || 10;
    my $characters = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    my $code = "";
    for (1..$length) {
        $code .= substr($characters, int(rand(length($characters))), 1);
    }
    return $code;
}

print "Random Code Generator\n";
print "=" x 20 . "\n";
print "\n";

for my $i (1..5) {
    my $code = generate_random_code(12);
    print "Code #$i: $code\n";
}

my ($sec, $min, $hour, $mday, $mon, $year) = localtime();
$year += 1900;
$mon += 1;
my $timestamp = sprintf("%04d-%02d-%02d %02d:%02d:%02d", $year, $mon, $mday, $hour, $min, $sec);
print "\nGenerated at: $timestamp\n";

