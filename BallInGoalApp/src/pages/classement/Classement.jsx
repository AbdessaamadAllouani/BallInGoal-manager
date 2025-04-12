import React, { useState } from 'react';
import './classement.css'

const Classement = () => {
    const [groupCount, setGroupCount] = useState();
    const [clubsPerGroup, setClubsPerGroup] = useState();
    const [teamsInPlayoff, setTeamsInPlayoff] = useState();

    return (
        <div className="tournament-setup">
            <form action="" method='POST'>
                <div className="configuration-section">
                    <div className="config-item">
                        <input
                            type="number"
                            value={groupCount}
                            onChange={(e) => setGroupCount(parseInt(e.target.value) || 0)}
                            min='1'
                            placeholder='Combien de groupes?'
                        />
                    </div>

                    <div className="config-item">
                        <input
                            type="number"
                            value={clubsPerGroup}
                            onChange={(e) => setClubsPerGroup(parseInt(e.target.value) || 0)}
                            min="1"
                            placeholder='Combien de clubs dans un groupe?'
                        />
                    </div>

                    <div className="config-item">
                        <input
                            type="number"
                            value={teamsInPlayoff}
                            onChange={(e) => setTeamsInPlayoff(parseInt(e.target.value) || 0)}
                            min="1"
                            placeholder="Avec combien d'équipes voulez-vous commencer la phase éliminatoire?"
                        />
                    </div>
                    <button className="create-button">Créer</button>
                </div>
            </form>
        </div>
    );
};

export default Classement;
