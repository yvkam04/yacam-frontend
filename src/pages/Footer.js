import React from "react";

function Footer() {
  return (
    <footer style={{background:"linear-gradient(90deg,#0d1b2a,#1b3a6b)",color:"white",padding:"32px 40px",marginTop:"auto"}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",flexWrap:"wrap",gap:"24px",maxWidth:"1200px",margin:"0 auto"}}>

        <div style={{display:"flex",alignItems:"flex-start",gap:"12px"}}>
          <div style={{width:"40px",height:"40px",background:"rgba(255,255,255,0.1)",borderRadius:"8px",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"1.2rem"}}>
            📧
          </div>
          <div>
            <div style={{fontWeight:600,fontSize:"0.85rem",color:"rgba(255,255,255,0.6)",marginBottom:"4px"}}>EMAIL</div>
            <a href="mailto:contact@yaconsulting.ci" style={{color:"white",textDecoration:"none",fontSize:"0.95rem",fontWeight:500}}>
              contact@yaconsulting.ci
            </a>
          </div>
        </div>

        <div style={{display:"flex",alignItems:"flex-start",gap:"12px"}}>
          <div style={{width:"40px",height:"40px",background:"rgba(255,255,255,0.1)",borderRadius:"8px",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"1.2rem"}}>
            📍
          </div>
          <div>
            <div style={{fontWeight:600,fontSize:"0.85rem",color:"rgba(255,255,255,0.6)",marginBottom:"4px"}}>LOCALISATION</div>
            <div style={{color:"white",fontSize:"0.95rem",fontWeight:500}}>Abidjan, Côte d'Ivoire</div>
            <a href="https://maps.google.com/?q=Abidjan" target="_blank" rel="noreferrer" style={{color:"rgba(255,255,255,0.6)",fontSize:"0.82rem",textDecoration:"none"}}>
              Voir sur la carte →
            </a>
          </div>
        </div>

        <div style={{display:"flex",alignItems:"flex-start",gap:"12px"}}>
          <div style={{width:"40px",height:"40px",background:"rgba(255,255,255,0.1)",borderRadius:"8px",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"1.2rem"}}>
            🌐
          </div>
          <div>
            <div style={{fontWeight:600,fontSize:"0.85rem",color:"rgba(255,255,255,0.6)",marginBottom:"4px"}}>SITE WEB</div>
            <a href="https://www.yaconsulting.ci" target="_blank" rel="noreferrer" style={{color:"white",textDecoration:"none",fontSize:"0.95rem",fontWeight:500}}>
              www.yaconsulting.ci
            </a>
            <div style={{color:"rgba(255,255,255,0.6)",fontSize:"0.82rem",marginTop:"4px"}}>Nos solutions et réalisations</div>
          </div>
        </div>

      </div>

      <div style={{borderTop:"1px solid rgba(255,255,255,0.1)",marginTop:"24px",paddingTop:"16px",textAlign:"center",color:"rgba(255,255,255,0.4)",fontSize:"0.8rem"}}>
        © {new Date().getFullYear()} YA Consulting — Tous droits réservés | Plateforme Cloud de Vidéosurveillance
      </div>

    </footer>
  );
}

export default Footer;