#!/bin/bash

# Create output directory if it doesn't exist
mkdir -p test/output

# Run the merge-md command
echo "Running merge-md-cli..."
node src/index.js --in test/input.json --out test/output/library.json

# Display the result
echo -e "\nMerged output:"
echo "============="
cat test/output/library.json | jq .

# Verify the output
echo -e "\nVerifying output..."
if [ -f test/output/library.json ]; then
    echo "✓ Output file created successfully"
    
    # Check if the output contains expected content
    if grep -q "Block Library Descriptions" test/output/library.json; then
        echo "✓ Found 'Block Library Descriptions' in output"
    else
        echo "✗ Could not find 'Block Library Descriptions' in output"
    fi

    # Verify blocks and descriptions
    echo -e "\nVerifying blocks and descriptions..."
    blocks=$(jq '.blocks | length' test/output/library.json)
    echo "Found $blocks blocks"

    # Check each block for required properties
    for i in $(seq 0 $((blocks-1))); do
        block_title=$(jq -r ".blocks[$i].block" test/output/library.json)
        has_description=$(jq -r ".blocks[$i].description != null" test/output/library.json)
        
        if [ "$has_description" = "true" ]; then
            echo "✓ Block '$block_title' has description"
        else
            echo "✗ Block '$block_title' is missing description"
        fi
    done
    
    echo -e "\nTest completed!"
else
    echo "✗ Output file not created"
    exit 1
fi 