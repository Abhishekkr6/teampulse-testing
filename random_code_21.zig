const std = @import("std");

// Random code generator
fn generateRandomCode(allocator: std.mem.Allocator, length: usize) ![]u8 {
    const characters = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    var code = try allocator.alloc(u8, length);
    var rng = std.Random.DefaultPrng.init(@intCast(std.time.timestamp()));
    var random = rng.random();
    
    for (0..length) |i| {
        code[i] = characters[random.uintLessThan(usize, characters.len)];
    }
    return code;
}

pub fn main() !void {
    var gpa = std.heap.GeneralPurposeAllocator(.{}){};
    defer _ = gpa.deinit();
    const allocator = gpa.allocator();
    
    const stdout = std.io.getStdOut().writer();
    
    try stdout.print("Random Code Generator\n");
    try stdout.print("====================\n\n");
    
    for (1..6) |i| {
        var code = try generateRandomCode(allocator, 12);
        defer allocator.free(code);
        try stdout.print("Code #{d}: {s}\n", .{ i, code });
    }
    
    const timestamp = std.time.timestamp();
    var buffer: [100]u8 = undefined;
    const formatted = try std.fmt.bufPrintZ(&buffer, "{d}", .{timestamp});
    try stdout.print("\nGenerated at: {s}\n", .{formatted});
}


