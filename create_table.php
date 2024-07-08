<?php
$servername = "	sql300.infinityfree.com";
$username = "	if0_36213692";
$password = "MN4444";
$dbname = "if0_36213692_playerlogging";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Get the table name from the POST request
$table_name = $_POST['table_name'];

// Validate table name
if (empty($table_name)) {
    die("Table name is required.");
}

// Sanitize table name to prevent SQL injection
$table_name = preg_replace('/[^a-zA-Z0-9_]/', '', $table_name);

echo "Attempting to create table '$table_name'...<br>";

// SQL to create table
$sql = "CREATE TABLE $table_name (
    id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    firstname VARCHAR(30) NOT NULL,
    lastname VARCHAR(30) NOT NULL,
    email VARCHAR(50),
    reg_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
)";

if ($conn->query($sql) === TRUE) {
    echo "Table '$table_name' created successfully.";
} else {
    echo "Error creating table: " . $conn->error;
}

$conn->close();
?>
