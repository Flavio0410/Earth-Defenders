<?php
$host = "localhost";
$username = "root";
$password = "";
$dbname = "earthdefendersdb";

$con = new mysqli($host, $username, $password, $dbname);

if (!$con) {
    die('Errore di connessione al database: ' . mysqli_connect_error());
}

$query = "SELECT * FROM record ORDER BY score DESC LIMIT 10";
$result = mysqli_query($con, $query);

if (!$result) {
    die('Errore query: ' . mysqli_error($con));
}
?>

<table class="table">
    <thead>
        <tr>
            <th scope="col">#</th>
            <th scope="col">Username</th>
            <th scope="col">Record</th>
            <th scope="col">Data</th>
        </tr>
    </thead>
    <tbody class="table-group-divider">
        <?php
        $rank = 1;
        while ($row = mysqli_fetch_assoc($result)) {
            $username = $row['Username'];
            $record = $row['Record'];
            $data = $row['Data'];

            echo "<tr>";
            echo "<th scope='row'>$rank</th>";
            echo "<td>$username</td>";
            echo "<td>$record</td>";
            echo "<td>$data</td>";
            echo "</tr>";

            $rank++;
        }
        ?>
    </tbody>
</table>

<?php
// Chiudi la connessione al database
mysqli_close($con);
?>
