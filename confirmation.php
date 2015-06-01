<?php 

require_once('connect.php');
$message = ''; 
$email = $_GET['email'];
$flag = $_GET['flag'];
$currentdate = date("Y-m-d"); 


$query = "SELECT flag,statut,subscribeDate FROM mailinglist WHERE email like :email ";
$preparedStatement = $connexion->prepare($query);
if($preparedStatement->execute(array(':email' => $email)) && $row = $preparedStatement->fetch()) {
    
    $getFlag = $row['flag'];	
    $getStatut = $row['statut'];
    $getDate = $row['subscribeDate'];
    
    
}
 
 
if($getStatut == '1') {
     
    $message = "Votre compte a déjà été activé, vous recevrez donc bien nos newsletters.";

} else if($flag == $getFlag )  {
        
        if (strtotime("$getDate +1 day " ) <= time() ) {
            $query = "DELETE FROM mailinglist WHERE email= :email"; 
            $preparedStatement = $connexion->prepare($query);
            $preparedStatement->bindParam(':email', $email);
            $preparedStatement->execute();
            $message = "vous avez attendu trop longtemps pour confirmer votre abonnement. Veuillez de nouveau remplir le formulaire d'inscription sur la page de contact.";
        
    } else {
            
          $message = "Merci beaucoup pour votre abonnement, votre compte a bien été activé ! Surveillez votre boîte mail ";
 
          $query = "UPDATE mailinglist SET statut = 1 WHERE email like :email ";
          $preparedStatement = $connexion->prepare($query);
          $preparedStatement->bindParam(':email', $email);
          $preparedStatement->execute();
            
        } 
    
    
} else {
    $message = "Erreur ! Votre compte ne peut être activé... Veuillez réessayer";
}
?>


<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, minimal-ui">
    <title>Abonnement Newsletter | Disparition, enqu&ecirc;te int&eacute;ractive</title>
    <meta name="description" content="Disparition est une histoire interactive vous invitant à enquêter sur la mystérieuse disparition d'une enfant.">
    <meta name="Keywords" content="Disparition, histoire, interactive, enquête, faux os, linos, arg, tfe, dwm, esiaj, alexandre buruk, ">
    <link rel="shortcut icon" href="assets/img/website/favicon.ico">
    <link rel="shortcut icon" href="assets/img/website/favicon.png">
    <link rel="stylesheet" href="assets/css/main.css">
    

</head>
<body class="abo">

    <div class="container">
        
        <section>
            
            <h1 id="logo"><a href="index.html">Disparition</a></h1>
            
            <div class="align">
               <h2>Confirmation de l'abonnement à la Newsletter</h2>
               
                <?php echo "<p class='message'>".$message."</p>";?>
                
                <a href="index.html" class="back-site">Retour au site</a>
            </div>
            
            
            
        </section>
        
    </div>

</body>
</html>