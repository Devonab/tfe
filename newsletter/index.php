<?php 
require_once('../connect.php');

if($_POST['delete']){
    $id = $_POST['delete_id'];  
    $query = "DELETE FROM mailinglist WHERE id= :id"; 
    $preparedStatement = $connexion->prepare($query);
    $preparedStatement->bindParam(':id', $id);
    $preparedStatement->execute();
}

if($_POST['addemail']){
    $add_mail = trim(strip_tags($_POST['addemail']));  
    $query = "INSERT INTO mailinglist (email) VALUES (:email)";
    $preparedStatement = $connexion->prepare($query);
    $preparedStatement->bindParam(':email', $add_mail);
    $preparedStatement->execute();
}

if($_POST['message']) {
    
    $messageContent = $_POST['message'];
    $subjectContent = trim(strip_tags($_POST['subject']));
    $query = "SELECT email FROM mailinglist";
    $preparedStatement = $connexion->prepare($query);
    $preparedStatement->execute();
    
    while( $result = $preparedStatement->fetch() ) {
        
        $to = $result['email'];
        $subject = $subjectContent;
        $headers .= 'From: Disparition | Enquête intéractive <disparition@alexandre-buruk.be>' . "\r\n";
        $headers = 'Mime-Version: 1.0'."\r\n";
        $headers .= 'Content-type: text/html; charset=utf-8'."\r\n";
        $headers .= "\r\n";
        $msg = $messageContent;

        // Function mail()
        mail($to, $subject, $msg, $headers);
    
    }

}
?>




<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>Administration | Newsletter</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>

<h1>Système d'administration de la Newsletter</h1>

<h2>Abonnés :</h2>
<table>
   <tr>
      <td>ID</td>
       <td>Email</td>
       <td>Supprimer user</td>
   </tr>
   <?php 
    
            $query = "SELECT * FROM mailinglist";
            $preparedStatement = $connexion->prepare($query);
            $preparedStatement->execute();

            while( $result = $preparedStatement->fetch(PDO::FETCH_ASSOC) ) {
                echo '<tr><td>'.$result['id'].'</td>';
                echo '<td>'.$result['email'].'</td>';
                echo '<td><form class="delete" method="post" action="">';
                echo '<input type="hidden" name="delete_id" value="'.$result['id'].'"/>';
                echo '<input type="submit" name="delete" value="X"/>';
                echo '</form></td></tr>';
            }
    
    ?>
   <tr>
       <td colspan="3">
       <form class="add" method="post" action="">
           <input type="text" name="addemail" placeholder="ajouter une adresse mail" />
           <input type ="submit" name="submit" value="valider" />
       </form>
       </td>
   </tr>
</table>

<h2>Créer une nouvelle newsletter :</h2>

<p class="good"><?php echo $message['ok']; ?></p>
<p class="error"><?php echo $message['erreur']; ?></p>

<form method="post" action="index.php">
    <input id="sujet" type="text" name="subject" required />
    <textarea cols="30" rows="10" id="message" name="message" placeholder="HTML autorisé"></textarea>
    <input type="submit" value="Envoyer la newsletter" />
</form>

</body>
</html>