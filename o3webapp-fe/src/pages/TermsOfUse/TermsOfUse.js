import React from 'react'

import './TermsOfUse.css'

function TermsOfUse() {
    return (
        <div className="TermsOfUsePageContainer">
            <div className="tos">
                <h2>Acceptable Use Policy and Conditions of Use</h2>
                <h3>
                    This Acceptable Use Policy and Conditions of Use (“AUP”) defines the rules and conditions that govern 
                    your access to and use (including transmission, processing, and storage of data) of the resources and services (“Services”) 
                    as granted by ## community, agency, or infrastructure name ## for the purpose of ## describe the stated goals and policies governing the intended use ##.<br></br>
                    <br></br>
                    1. You shall only use the Services in a manner consistent with the purposes and limitations described above; 
                    you shall show consideration towards other users including by not causing harm to the Services; 
                    you have an obligation to collaborate in the resolution of issues arising from your use of the Services. <br></br>
                    2. You shall only use the Services for lawful purposes and not breach, attempt to breach, nor circumvent administrative or security controls.<br></br>
                    3. You shall respect intellectual property and confidentiality agreements.<br></br>
                    4. You  shall  protect  your  access  credentials  (e.g.  passwords,  private  keys  or  multi-factor tokens); no intentional sharing is permitted.<br></br>
                    5. You shall keep your registered information correct and up to date.<br></br>
                    6. You shall promptly report known or suspected security breaches, credential compromise, 
                    or  misuse  to  the  security  contact  stated  below;  and  report  any  compromised  credentials  to the relevant issuing authorities.<br></br>
                    7. Reliance  on  the  Services  shall  only  be  to  the  extent  specified  by  any  applicable  service level agreements listed below. 
                    Use without such agreements is at your own risk.<br></br>
                    8. Your  personal  data  will  be  processed  in  accordance  with  the  privacy  statements referenced below.<br></br>
                    9. Your use of the Services may be restricted or suspended, for administrative, operational, or security reasons, without prior notice and without compensation.<br></br>
                    10. If  you  violate  these  rules,  you  may  be  liable  for  the  consequences,  
                    which  may  include your account being suspended and a report being made to your home organisation or to law enforcement.<br></br>
                    <br></br>

                    The administrative contact for this AUP is: ## email address for the community, agency, or infrastructure name ## <br></br>
                    The security contact for this AUP is: ## email address for the community, agency, or infrastructure security contact ## <br></br>
                    The privacy statements (e.g. Privacy Notices) are located at: <a href="/terms_of_use">/terms_of_use</a><br></br>
                    Applicable service level agreements are located at: ## URLs ##<br></br>
                </h3>
            </div>
        </div>
    );
}

export default TermsOfUse;