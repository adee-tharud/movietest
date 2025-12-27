<?php
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(["message" => "Method not allowed"]);
    exit;
}

$data = json_decode(file_get_contents("php://input"), true);


$errors = [];

$firstName = trim($data['firstName'] ?? '');
$lastName  = trim($data['lastName'] ?? '');
$email     = trim($data['email'] ?? '');
$phone     = trim($data['phone'] ?? '');
$message   = trim($data['comments'] ?? '');

if ($firstName === '') $errors[] = "First name is required";
if ($lastName === '')  $errors[] = "Last name is required";
if ($email === '' || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $errors[] = "Valid email is required";
}
if ($message === '') $errors[] = "Message is required";

if (!empty($errors)) {
    http_response_code(400);
    echo json_encode([
        "message" => "Validation failed",
        "errors" => $errors
    ]);
    exit;
}

$entry = [
    "firstName" => $firstName,
    "lastName"  => $lastName,
    "email"     => $email,
    "phone"     => $phone,
    "message"   => $message,
    "submittedAt" => date("Y-m-d H:i:s")
];

$filePath = __DIR__ . "/data/submissions.json";

// Create file if not exists
if (!file_exists($filePath)) {
    file_put_contents($filePath, json_encode([]));
}

$existing = json_decode(file_get_contents($filePath), true);
$existing[] = $entry;

file_put_contents($filePath, json_encode($existing, JSON_PRETTY_PRINT));


$userSubject = "We received your message";
$userBody = "
Hi {$firstName},

Thank you for contacting us.
We have successfully received your message and will get back to you shortly.

Regards,
IT Group
";

mail($email, $userSubject, $userBody);

//Admin email
$adminEmails = [
    "dumidu.kodithuwakku@ebeyonds.com",
    "prabhath.senadheera@ebeyonds.com"
];

$adminSubject = "New Contact Form Submission";
$adminBody = "
New contact form submission:

Name: {$firstName} {$lastName}
Email: {$email}
Phone: {$phone}

Message:
{$message}

Submitted at: {$entry['submittedAt']}
";

foreach ($adminEmails as $adminEmail) {
    file_put_contents(
        __DIR__ . '/logs/mail.log',
        "ADMIN EMAIL TO: {$adminEmail}\n{$adminBody}\n\n",
        FILE_APPEND
    );
    // in local env mails not sent , due to no smtp server
    // mail($adminEmail, $adminSubject, $adminBody);
}

echo json_encode([
    "message" => "Form submitted successfully"
]);