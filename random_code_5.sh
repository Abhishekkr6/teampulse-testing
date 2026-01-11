#!/usr/bin/env bash
################################################################################
# Advanced Random Code Generator v2.0
# A comprehensive tool for generating various types of random codes, IDs, and tokens
# Supports multiple formats, validation, bulk operations, and extensive configuration
################################################################################

set -euo pipefail
IFS=$'\n\t'

# Global Configuration
VERSION="2.0.0"
SCRIPT_NAME="Random Code Generator"
DEFAULT_COUNT=10
DEFAULT_LENGTH=16
LOG_FILE="${TMPDIR:-/tmp}/random_code_generator.log"
CONFIG_FILE="${HOME}/.random_code_config"

# Output Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
MAGENTA='\033[0;35m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# Generation Modes
declare -A MODES=(
    ["alphanumeric"]=1
    ["numeric"]=1
    ["hex"]=1
    ["uuid"]=1
    ["base64"]=1
    ["password"]=1
    ["token"]=1
    ["pin"]=1
    ["slug"]=1
    ["license"]=1
)

# Statistics
STATS_GENERATED=0
STATS_START_TIME=0
STATS_END_TIME=0

################################################################################
# Logging Functions
################################################################################

log() {
    local level="$1"
    shift
    local message="$*"
    local timestamp=$(date '+%Y-%m-%d %H:%M:%S')
    echo "[$timestamp] [$level] $message" >> "$LOG_FILE"
}

log_info() {
    log "INFO" "$@"
    echo -e "${BLUE}[INFO]${NC} $*"
}

log_error() {
    log "ERROR" "$@"
    echo -e "${RED}[ERROR]${NC} $*" >&2
}

log_warning() {
    log "WARNING" "$@"
    echo -e "${YELLOW}[WARNING]${NC} $*"
}

log_success() {
    log "SUCCESS" "$@"
    echo -e "${GREEN}[SUCCESS]${NC} $*"
}

################################################################################
# Configuration Management
################################################################################

load_config() {
    if [[ -f "$CONFIG_FILE" ]]; then
        source "$CONFIG_FILE"
        log_info "Configuration loaded from $CONFIG_FILE"
    else
        log_info "Using default configuration"
    fi
}

save_config() {
    cat > "$CONFIG_FILE" << EOF
# Random Code Generator Configuration
# Generated on $(date)

DEFAULT_MODE="${DEFAULT_MODE:-alphanumeric}"
DEFAULT_LENGTH="${DEFAULT_LENGTH:-16}"
DEFAULT_COUNT="${DEFAULT_COUNT:-10}"
PREFERRED_CASE="${PREFERRED_CASE:-mixed}"
INCLUDE_SYMBOLS="${INCLUDE_SYMBOLS:-false}"
EOF
    log_info "Configuration saved to $CONFIG_FILE"
}

################################################################################
# Random Number Generation (Cross-platform)
################################################################################

get_random() {
    local max="$1"
    if command -v shuf &> /dev/null; then
        shuf -i 0-$((max - 1)) -n 1
    elif command -v gshuf &> /dev/null; then
        gshuf -i 0-$((max - 1)) -n 1
    else
        # Fallback using $RANDOM
        echo $((RANDOM % max))
    fi
}

get_cryptographic_random() {
    local bytes="$1"
    if [[ -r /dev/urandom ]]; then
        hexdump -vn"$bytes" -e '/1 "%02x"' /dev/urandom 2>/dev/null || od -An -N"$bytes" -tx1 /dev/urandom 2>/dev/null | tr -d ' \n'
    else
        openssl rand -hex "$bytes" 2>/dev/null || python3 -c "import secrets; print(secrets.token_hex($bytes))" 2>/dev/null || echo "$(date +%s%N | sha256sum | head -c $((bytes * 2)))"
    fi
}

################################################################################
# Character Set Definitions
################################################################################

get_charset() {
    local mode="$1"
    local include_symbols="${2:-false}"
    
    case "$mode" in
        alphanumeric)
            echo "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
            ;;
        numeric)
            echo "0123456789"
            ;;
        hex)
            echo "0123456789abcdef"
            ;;
        hex_upper)
            echo "0123456789ABCDEF"
            ;;
        alphabetic)
            echo "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
            ;;
        alphabetic_lower)
            echo "abcdefghijklmnopqrstuvwxyz"
            ;;
        alphabetic_upper)
            echo "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
            ;;
        base64_safe)
            echo "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ-_"
            ;;
        password)
            local chars="0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
            if [[ "$include_symbols" == "true" ]]; then
                chars="${chars}!@#$%^&*()_+-=[]{}|;:,.<>?"
            fi
            echo "$chars"
            ;;
        slug)
            echo "0123456789abcdefghijklmnopqrstuvwxyz-"
            ;;
        *)
            echo "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
            ;;
    esac
}

################################################################################
# Code Generation Functions
################################################################################

generate_alphanumeric() {
    local length="$1"
    local case_mode="${2:-mixed}"
    local charset
    
    case "$case_mode" in
        lower)
            charset=$(get_charset "alphabetic_lower")
            charset="${charset}0123456789"
            ;;
        upper)
            charset=$(get_charset "alphabetic_upper")
            charset="${charset}0123456789"
            ;;
        *)
            charset=$(get_charset "alphanumeric")
            ;;
    esac
    
    generate_from_charset "$length" "$charset"
}

generate_numeric() {
    local length="$1"
    local charset=$(get_charset "numeric")
    generate_from_charset "$length" "$charset"
}

generate_hex() {
    local length="$1"
    local case_mode="${2:-lower}"
    local charset
    
    if [[ "$case_mode" == "upper" ]]; then
        charset=$(get_charset "hex_upper")
    else
        charset=$(get_charset "hex")
    fi
    
    generate_from_charset "$length" "$charset"
}

generate_uuid() {
    local version="${1:-4}"
    local uuid
    
    case "$version" in
        4)
            # UUID v4 (random)
            local hex=$(get_cryptographic_random 16 | head -c 32)
            uuid="${hex:0:8}-${hex:8:4}-4${hex:13:3}-$((0x8 | 0x${hex:16:1}))${hex:17:3}-${hex:20:12}"
            ;;
        *)
            # Simple UUID-like format
            uuid=$(get_cryptographic_random 16 | head -c 32)
            uuid="${uuid:0:8}-${uuid:8:4}-${uuid:12:4}-${uuid:16:4}-${uuid:20:12}"
            ;;
    esac
    
    echo "$uuid"
}

generate_password() {
    local length="$1"
    local include_symbols="${2:-false}"
    local charset=$(get_charset "password" "$include_symbols")
    generate_from_charset "$length" "$charset"
}

generate_pin() {
    local length="${1:-6}"
    generate_numeric "$length"
}

generate_token() {
    local length="${1:-32}"
    local charset=$(get_charset "base64_safe")
    generate_from_charset "$length" "$charset"
}

generate_slug() {
    local length="${1:-12}"
    local charset=$(get_charset "slug")
    local slug=$(generate_from_charset "$length" "$charset")
    # Ensure it doesn't start or end with a dash
    slug=$(echo "$slug" | sed 's/^-//;s/-$//')
    echo "$slug"
}

generate_license_key() {
    local segments="${1:-4}"
    local segment_length="${2:-4}"
    local key=""
    
    for ((i=1; i<=segments; i++)); do
        if [[ $i -gt 1 ]]; then
            key="${key}-"
        fi
        local segment=$(generate_alphanumeric "$segment_length" "upper")
        key="${key}${segment}"
    done
    
    echo "$key"
}

generate_base64() {
    local length="$1"
    local bytes=$((length * 3 / 4))
    local random_bytes=$(get_cryptographic_random "$bytes")
    
    if command -v base64 &> /dev/null; then
        echo -n "$random_bytes" | base64 | head -c "$length" | tr -d '\n'
    elif command -v python3 &> /dev/null; then
        python3 -c "import secrets, base64; print(base64.b64encode(secrets.token_bytes($bytes)).decode()[:$length])"
    else
        generate_token "$length"
    fi
}

generate_from_charset() {
    local length="$1"
    local charset="$2"
    local charset_len=${#charset}
    local result=""
    
    for ((i=0; i<length; i++)); do
        local index=$(get_random "$charset_len")
        result="${result}${charset:$index:1}"
    done
    
    echo "$result"
}

################################################################################
# Main Generation Function
################################################################################

generate_code() {
    local mode="$1"
    local length="$2"
    local case_mode="${3:-mixed}"
    local include_symbols="${4:-false}"
    local code=""
    
    case "$mode" in
        alphanumeric)
            code=$(generate_alphanumeric "$length" "$case_mode")
            ;;
        numeric|pin)
            code=$(generate_numeric "$length")
            ;;
        hex)
            code=$(generate_hex "$length" "$case_mode")
            ;;
        uuid)
            code=$(generate_uuid 4)
            ;;
        base64)
            code=$(generate_base64 "$length")
            ;;
        password)
            code=$(generate_password "$length" "$include_symbols")
            ;;
        token)
            code=$(generate_token "$length")
            ;;
        slug)
            code=$(generate_slug "$length")
            ;;
        license)
            code=$(generate_license_key 4 4)
            ;;
        *)
            log_error "Unknown generation mode: $mode"
            return 1
            ;;
    esac
    
    echo "$code"
}

################################################################################
# Validation Functions
################################################################################

validate_code() {
    local code="$1"
    local mode="$2"
    local is_valid=0
    
    case "$mode" in
        numeric|pin)
            if [[ "$code" =~ ^[0-9]+$ ]]; then
                is_valid=1
            fi
            ;;
        hex)
            if [[ "$code" =~ ^[0-9a-fA-F]+$ ]]; then
                is_valid=1
            fi
            ;;
        uuid)
            if [[ "$code" =~ ^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$ ]]; then
                is_valid=1
            fi
            ;;
        *)
            is_valid=1
            ;;
    esac
    
    return $((1 - is_valid))
}

################################################################################
# Batch Processing
################################################################################

generate_batch() {
    local mode="$1"
    local length="$2"
    local count="$3"
    local case_mode="${4:-mixed}"
    local include_symbols="${5:-false}"
    local output_file="${6:-}"
    local validate="${7:-false}"
    local unique="${8:-false}"
    
    local temp_file=""
    if [[ -n "$output_file" ]]; then
        temp_file=$(mktemp)
        > "$output_file"
    fi
    
    local generated_codes=()
    local attempts=0
    local max_attempts=$((count * 100))
    
    STATS_START_TIME=$(date +%s.%N)
    
    while [[ ${#generated_codes[@]} -lt "$count" && $attempts -lt $max_attempts ]]; do
        local code=$(generate_code "$mode" "$length" "$case_mode" "$include_symbols")
        
        if [[ "$validate" == "true" ]]; then
            if ! validate_code "$code" "$mode"; then
                ((attempts++))
                continue
            fi
        fi
        
        if [[ "$unique" == "true" ]]; then
            local is_duplicate=0
            for existing_code in "${generated_codes[@]}"; do
                if [[ "$code" == "$existing_code" ]]; then
                    is_duplicate=1
                    break
                fi
            done
            
            if [[ $is_duplicate -eq 1 ]]; then
                ((attempts++))
                continue
            fi
        fi
        
        generated_codes+=("$code")
        ((STATS_GENERATED++))
        
        if [[ -n "$output_file" ]]; then
            echo "$code" >> "$temp_file"
        else
            echo "$code"
        fi
        
        ((attempts++))
    done
    
    STATS_END_TIME=$(date +%s.%N)
    
    if [[ -n "$output_file" && -f "$temp_file" ]]; then
        mv "$temp_file" "$output_file"
        log_success "Generated $count codes and saved to $output_file"
    fi
    
    if [[ ${#generated_codes[@]} -lt "$count" ]]; then
        log_warning "Could only generate ${#generated_codes[@]} unique codes (requested: $count)"
    fi
}

################################################################################
# Statistics and Reporting
################################################################################

show_statistics() {
    local elapsed=$(echo "$STATS_END_TIME - $STATS_START_TIME" | bc 2>/dev/null || echo "0")
    local rate=$(echo "scale=2; $STATS_GENERATED / $elapsed" 2>/dev/null || echo "0")
    
    echo ""
    echo -e "${CYAN}═══════════════════════════════════════${NC}"
    echo -e "${CYAN}          Generation Statistics${NC}"
    echo -e "${CYAN}═══════════════════════════════════════${NC}"
    echo -e "Codes Generated: ${GREEN}$STATS_GENERATED${NC}"
    echo -e "Time Elapsed:    ${GREEN}${elapsed}s${NC}"
    echo -e "Generation Rate: ${GREEN}${rate} codes/sec${NC}"
    echo -e "${CYAN}═══════════════════════════════════════${NC}"
    echo ""
}

################################################################################
# Help and Documentation
################################################################################

show_help() {
    cat << EOF
${CYAN}${SCRIPT_NAME} v${VERSION}${NC}

${GREEN}DESCRIPTION:${NC}
    Advanced random code generator supporting multiple formats and extensive
    configuration options. Generates secure, random codes for various use cases.

${GREEN}USAGE:${NC}
    $0 [OPTIONS] [MODE] [LENGTH] [COUNT]

${GREEN}MODES:${NC}
    alphanumeric    Alphanumeric characters (default)
    numeric         Numeric only (0-9)
    hex             Hexadecimal (0-9, a-f)
    uuid            UUID v4 format
    base64          Base64 encoded string
    password        Password-style (optionally with symbols)
    token           URL-safe token
    pin             Numeric PIN code
    slug            URL-friendly slug
    license         License key format (XXXX-XXXX-XXXX-XXXX)

${GREEN}OPTIONS:${NC}
    -h, --help              Show this help message
    -v, --version           Show version information
    -m, --mode MODE         Generation mode (default: alphanumeric)
    -l, --length LENGTH     Code length (default: 16)
    -c, --count COUNT       Number of codes to generate (default: 10)
    -o, --output FILE       Write output to file
    -u, --unique            Ensure all codes are unique
    -V, --validate          Validate generated codes
    -s, --stats             Show generation statistics
    --case CASE             Case mode: lower, upper, mixed (default: mixed)
    --symbols               Include symbols in password mode
    --config-save           Save current settings as default
    --config-load           Load settings from config file
    --log-level LEVEL       Set log level: error, warning, info, debug

${GREEN}EXAMPLES:${NC}
    $0                                    # Generate 10 alphanumeric codes
    $0 -c 20 numeric 8                    # Generate 20 numeric PINs of length 8
    $0 -m uuid -c 5                       # Generate 5 UUIDs
    $0 -m password -l 24 --symbols -c 3   # Generate 3 passwords with symbols
    $0 -m license -c 100 -o keys.txt -u   # Generate 100 unique license keys
    $0 -m hex -l 32 -c 50 -s              # Generate 50 hex codes with stats

${GREEN}AUTHOR:${NC}
    Advanced Random Code Generator v${VERSION}

${GREEN}LICENSE:${NC}
    Free to use and modify

EOF
}

show_version() {
    echo -e "${CYAN}${SCRIPT_NAME} v${VERSION}${NC}"
    echo "Advanced random code generation tool"
    echo "Built with comprehensive features and cross-platform support"
}

################################################################################
# Main Function
################################################################################

main() {
    # Initialize
    local mode="alphanumeric"
    local length="$DEFAULT_LENGTH"
    local count="$DEFAULT_COUNT"
    local output_file=""
    local show_stats=false
    local unique=false
    local validate=false
    local case_mode="mixed"
    local include_symbols=false
    local save_config_flag=false
    local load_config_flag=false
    
    # Parse arguments
    while [[ $# -gt 0 ]]; do
        case "$1" in
            -h|--help)
                show_help
                exit 0
                ;;
            -v|--version)
                show_version
                exit 0
                ;;
            -m|--mode)
                mode="$2"
                shift 2
                ;;
            -l|--length)
                length="$2"
                shift 2
                ;;
            -c|--count)
                count="$2"
                shift 2
                ;;
            -o|--output)
                output_file="$2"
                shift 2
                ;;
            -u|--unique)
                unique=true
                shift
                ;;
            -V|--validate)
                validate=true
                shift
                ;;
            -s|--stats)
                show_stats=true
                shift
                ;;
            --case)
                case_mode="$2"
                shift 2
                ;;
            --symbols)
                include_symbols=true
                shift
                ;;
            --config-save)
                save_config_flag=true
                shift
                ;;
            --config-load)
                load_config_flag=true
                shift
                ;;
            --log-level)
                # Log level handling (simplified)
                shift 2
                ;;
            -*)
                log_error "Unknown option: $1"
                echo "Use -h or --help for usage information."
                exit 1
                ;;
            *)
                # Positional arguments: MODE LENGTH COUNT
                if [[ -z "${2:-}" ]]; then
                    mode="$1"
                elif [[ -z "${3:-}" ]]; then
                    mode="$1"
                    length="$2"
                else
                    mode="$1"
                    length="$2"
                    count="$3"
                fi
                shift $#
                ;;
        esac
    done
    
    # Load configuration if requested
    if [[ "$load_config_flag" == "true" ]]; then
        load_config
    fi
    
    # Validate mode
    if [[ -z "${MODES[$mode]:-}" ]]; then
        log_warning "Unknown mode '$mode', using 'alphanumeric'"
        mode="alphanumeric"
    fi
    
    # Validate length
    if ! [[ "$length" =~ ^[0-9]+$ ]] || [[ "$length" -lt 1 ]]; then
        log_error "Invalid length: $length (must be a positive integer)"
        exit 1
    fi
    
    # Validate count
    if ! [[ "$count" =~ ^[0-9]+$ ]] || [[ "$count" -lt 1 ]]; then
        log_error "Invalid count: $count (must be a positive integer)"
        exit 1
    fi
    
    # Save config if requested
    if [[ "$save_config_flag" == "true" ]]; then
        save_config
    fi
    
    # Generate codes
    log_info "Generating $count codes in mode '$mode' with length $length"
    generate_batch "$mode" "$length" "$count" "$case_mode" "$include_symbols" "$output_file" "$validate" "$unique"
    
    # Show statistics if requested
    if [[ "$show_stats" == "true" ]]; then
        show_statistics
    fi
    
    log_success "Generation completed successfully"
}

################################################################################
# Script Entry Point
################################################################################

# Check for required commands
for cmd in bc date; do
    if ! command -v "$cmd" &> /dev/null; then
        log_warning "$cmd not found. Some features may not work correctly."
    fi
done

# Run main function
main "$@"

################################################################################
# End of Script
################################################################################
