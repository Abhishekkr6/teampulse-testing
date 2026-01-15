"""
Data processing utilities for handling various data formats
"""

import json
import csv
from typing import List, Dict, Any
import re


class DataProcessor:
    """Process and transform data from different sources."""
    
    def __init__(self):
        self.data = []
    
    def load_json(self, json_string: str) -> Dict[str, Any]:
        """Parse JSON string and return dictionary."""
        try:
            return json.loads(json_string)
        except json.JSONDecodeError as e:
            print(f"JSON parsing error: {e}")
            return {}
    
    def validate_email(self, email: str) -> bool:
        """Validate email format."""
        pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
        return re.match(pattern, email) is not None
    
    def parse_csv_data(self, csv_content: str) -> List[Dict]:
        """Parse CSV content into list of dictionaries."""
        lines = csv_content.strip().split('\n')
        if not lines:
            return []
        
        headers = lines[0].split(',')
        data = []
        
        for line in lines[1:]:
            values = line.split(',')
            if len(values) == len(headers):
                data.append(dict(zip(headers, values)))
        
        return data
    
    def filter_records(self, records: List[Dict], key: str, value: Any) -> List[Dict]:
        """Filter records by key-value pair."""
        return [r for r in records if r.get(key) == value]
    
    def aggregate_numeric(self, records: List[Dict], field: str) -> Dict[str, float]:
        """Calculate statistics for numeric field."""
        values = []
        for record in records:
            try:
                values.append(float(record.get(field, 0)))
            except (ValueError, TypeError):
                continue
        
        if not values:
            return {}
        
        return {
            'sum': sum(values),
            'average': sum(values) / len(values),
            'min': min(values),
            'max': max(values),
            'count': len(values)
        }


if __name__ == '__main__':
    processor = DataProcessor()
    
    # Example JSON
    json_data = '{"name": "John", "age": 30, "city": "NYC"}'
    result = processor.load_json(json_data)
    print("JSON Result:", result)
    
    # Example email validation
    emails = ["test@example.com", "invalid.email@", "user@domain.org"]
    for email in emails:
        print(f"{email}: {processor.validate_email(email)}")
