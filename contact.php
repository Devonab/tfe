<?php 
error_reporting(E_ALL);
require_once('connect.php');

if (count($_POST)>0) {
    
    
    if($_POST['check'] != '' ){
        die("bien essayé...");
    }
   
    $messages = array(); 
    $subscribe = $_POST['subscribe'];
    $errorUnvalidMail = "";
    $email = trim(strip_tags($_POST['email']));
    
    if (!filter_var($email, FILTER_VALIDATE_EMAIL) === false) {
     
        // If radio = 1
        if( $subscribe == 1 ) { 
            
            try{   
            
            $query = "SELECT COUNT(*) AS total FROM mailinglist WHERE email = :email";
            $preparedStatement = $connexion->prepare($query);
            $preparedStatement->bindParam(':email', $email);
            $preparedStatement->execute();
            $result = $preparedStatement->fetch();
            } catch(Exception $e){
                var_dump($e);
                exit;
            }
            
            if(!empty($result) && $result['total'] > 0) {
                $messages['doublon'] = "<p>Vous êtes déjà dans notre base de donnée.</p>";

            } else {
                $query = "INSERT INTO mailinglist (email) VALUES (:email)";
                $preparedStatement = $connexion->prepare($query);
                $preparedStatement->bindParam(':email', $email);
                $preparedStatement->execute();
                $messages['added'] = "<p>Vous avez été ajouté dans notre base de donnée</p>"; 
            }

        } else {
            
            try{   
                $query = "SELECT COUNT(*) AS total FROM mailinglist WHERE email = :email";
                $preparedStatement = $connexion->prepare($query);
                $preparedStatement->bindParam(':email', $email);
                $preparedStatement->execute();
                $result = $preparedStatement->fetch();
            } catch(Exception $e){
                var_dump($e);
                exit;
            }
            
            if(!empty($result) && $result['total'] > 0) {
                $query = "DELETE FROM mailinglist WHERE email = :email";
                $preparedStatement = $connexion->prepare($query);
                $preparedStatement->bindParam(':email', $email);
                $preparedStatement->execute();
                $messages['supp'] = "<p>Vous avez été supprimé de notre liste.</p>";
            } else {
                $messages['noexist'] = "<p>Vous n'êtes pas dans notre base de donnée.</p>";
            }
            
        }

    
    } else {
       $messages['mail'] = "<p>Votre adresse email n'est pas valide</p>";
    }
    
    
}

?>
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, minimal-ui">
    <title>Contact | Disparition, enqu&ecirc;te int&eacute;ractive</title>
    <link rel="shortcut icon" href="assets/img/website/favicon.ico">
    <link rel="shortcut icon" href="assets/img/website/favicon.png">
    <link rel="stylesheet" href="assets/css/main.css">

</head>
<body id="contact" class="main-site">
    
        <div class="container">
            <h1 id="logo"><a href="index.html">Disparition</a></h1>
            
            <section>
                
                <h1 id="about">Contact</h1>
                
                <p>Une question particulière ? Envie de simplement écrire un message ? N'hésitez pas et écrivez-moi à <a href="#">contact@disparition.be</a></p>
                
                <h2>Newsletter</h2>
                    
                <p>Vous pouvez vous inscrire à notre Newsletter afin de recevoir les dernières informations sur le projet ainsi que d'autres messages en rapport avec ce dernier.</p>
                
                <div id="error">
                   <?php echo $messages['mail']; ?>
                   <?php echo $messages['doublon']; ?>
                   <?php echo $messages['noexist']; ?>
                </div>
                
                <div id="success">
                   <?php echo $messages['added']; ?>
                   <?php echo $messages['supp']; ?>
                </div>
                
                <form id="addressForm" action="contact.php" method="post"> 
                    <fieldset> 
                        <label for="email"> 
                          <input type="text" name="email" id="email" placeholder="votre adresse email" required/> 
                        </label>
                         <label for="check">
                             <input type="text" id="check" name="check" placeholder="à laisser vide"/>
                         </label> 
                         
                        <input id="subscribe" type="radio" name="subscribe" value="1" required/>
                        <label for="subscribe">S'abonner</label>
                        <input id="unsubscribe" type="radio" name="subscribe" value="0" required/>
                        <label for="unsubscribe">Se désabonner</label>
                        <input type="submit" name="submit" value="envoyer"/>
                        </p> 
                        

                      </fieldset> 

                </form>
                
                <a href="index.html" id="back" >Retour</a>
                
                <footer>

                       <nav>
                           <ul>
                               <li><a href="credits.html">Crédits</a></li>
                               <li><a href="mentions-legales.html">Mentions légales</a></li>
                               <li><a class="contact-target" href="contact.php">Contact</a></li>
                           </ul>

                           <ul class="social">
                               <li><a href="#">Facebook</a></li>
                               <li><a href="#">Twitter</a></li>
                               <li><a href="#">Google +</a></li>
                               <li><a href="#">Email</a></li>
                           </ul>
                       </nav>

                    </footer>
                
            </section>
            
        </div>
</body>
</html>