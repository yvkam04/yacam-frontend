import React from "react";

function Footer() {
  return (
    <footer style={{background:"linear-gradient(90deg,#0d1b2a,#1b3a6b)",color:"white",padding:"32px 40px",marginTop:"auto"}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",flexWrap:"wrap",gap:"24px",maxWidth:"1200px",margin:"0 auto"}}>

        {/* Email */}
        <div style={{display:"flex",alignItems:"flex-start",gap:"12px"}}>
          <div style={{width:"40px",height:"40px",background:"rgba(255,255,255,0.1)",borderRadius:"8px",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"1.2rem"}}>
            📧
          </div>
          <div>
            <div style={{fontWeight:600,fontSize:"0.85rem",color:"rgba(255,255,255,0.6)",marginBottom:"4px"}}>EMAIL</div>
            <a href="mailto:courriel@ya-consulting.com" style={{color:"white",textDecoration:"none",fontSize:"0.95rem",fontWeight:500}}>
              courriel@ya-consulting.com
            </a>
          </div>
        </div>

        {/* Téléphone */}
        <div style={{display:"flex",alignItems:"flex-start",gap:"12px"}}>
          <div style={{width:"40px",height:"40px",background:"rgba(255,255,255,0.1)",borderRadius:"8px",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"1.2rem"}}>
            📞
          </div>
          <div>
            <div style={{fontWeight:600,fontSize:"0.85rem",color:"rgba(255,255,255,0.6)",marginBottom:"4px"}}>TÉLÉPHONE</div>
            <a href="tel:+2250152226312" style={{color:"white",textDecoration:"none",fontSize:"0.95rem",fontWeight:500,display:"block"}}>
              (225) 01 52 22 63 12
            </a>
            <a href="tel:+2250565246974" style={{color:"rgba(255,255,255,0.7)",textDecoration:"none",fontSize:"0.9rem"}}>
              (225) 05 65 24 69 74
            </a>
          </div>
        </div>

        {/* Localisation */}
        <div style={{display:"flex",alignItems:"flex-start",gap:"12px"}}>
          <div style={{width:"40px",height:"40px",background:"rgba(255,255,255,0.1)",borderRadius:"8px",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"1.2rem"}}>
            📍
          </div>
          <div>
            <div style={{fontWeight:600,fontSize:"0.85rem",color:"rgba(255,255,255,0.6)",marginBottom:"4px"}}>LOCALISATION</div>
            <div style={{color:"white",fontSize:"0.9rem",fontWeight:500,lineHeight:"1.5"}}>
              Riviera Palmeraie, en face<br/>
              de la Pharmacie rue Ministre<br/>
              Cocody, Abidjan
            </div>
            <a href="https://maps.google.com/?q=Riviera+Palmeraie+Cocody+Abidjan" target="_blank" rel="noreferrer" style={{color:"rgba(255,255,255,0.6)",fontSize:"0.82rem",textDecoration:"none"}}>
              Voir sur la carte →
            </a>
          </div>
        </div>

        {/* Site web */}
        <div style={{display:"flex",alignItems:"flex-start",gap:"12px"}}>
          <div style={{width:"40px",height:"40px",background:"rgba(255,255,255,0.1)",borderRadius:"8px",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"1.2rem"}}>
            🌐
          </div>
          <div>
            <div style={{fontWeight:600,fontSize:"0.85rem",color:"rgba(255,255,255,0.6)",marginBottom:"4px"}}>SITE WEB</div>
            <a href="https://www.ya-consulting.com" target="_blank" rel="noreferrer" style={{color:"white",textDecoration:"none",fontSize:"0.95rem",fontWeight:500}}>
              www.ya-consulting.com
            </a>
            <div style={{color:"rgba(255,255,255,0.6)",fontSize:"0.82rem",marginTop:"4px"}}>
              Nos solutions et réalisations
            </div>
          </div>
        </div>

      </div>

      {/* Ligne de séparation */}
      <div style={{borderTop:"1px solid rgba(255,255,255,0.1)",marginTop:"24px",paddingTop:"16px",textAlign:"center",color:"rgba(255,255,255,0.4)",fontSize:"0.8rem"}}>
        © {new Date().getFullYear()} YA Consulting — Tous droits réservés | Plateforme Cloud de Vidéosurveillance
      </div>

    </footer>
  );
}

export default Footer;