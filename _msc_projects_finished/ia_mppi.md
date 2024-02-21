---
title: "Interaction-Aware Sampling-Based MPC with Learned Local Goal Prediction"
redirect_from:
    - /pubpage/IA_MPPI_LBM.html
authors:
    - name: "Walter Jansma"
      # url: "https://andreumatoses.github.io/"
      superscript: "1"
    - name: "Elia Trevisan"
      # url: "https://andreumatoses.github.io/"
      superscript: "1"
    - name: "Álvaro Serra-Gómez"
      # url: "https://andreumatoses.github.io/"
      superscript: "1"
    - name: "Javier Alonso-Mora"
      # url: "https://andreumatoses.github.io/"
      superscript: "1"
affiliations:
    # - name: "Equal contribution"
    #   superscript: "*"
    - name: "TU Delft"
      superscript: "1"
      url: "https://tudelft.nl"
    # - name: "Wien Opera House"
    #   superscript: "†"
end_date: 2023-12-04 # end date if ended, approximated if not sure. Just for display purposes and ordering.
# This is the short project description, displayed in the project's card"
description: "Motion planning for autonomous robots in tight, interaction-rich, and mixed human-robot environments is challenging. State-of-the-art methods typically separate prediction and planning, predicting other agents’ trajectories first and then planning the ego agent’s motion in the remaining free space. However, agents’ lack of awareness of their influence on others can lead to the freezing robot problem. We build upon Interaction-Aware Model Predictive Path Integral (IAMPPI) control and combine it with learning-based trajectory predictions, thereby relaxing its reliance on communicated short-term goals for other agents. We apply this framework to Autonomous Surface Vessels (ASVs) navigating urban canals. By generating an artificial dataset in real sections of Amsterdam’s canals, adapting and training a prediction model for our domain, and proposing heuristics to extract local goals, we enable effective cooperation in planning. Our approach improves autonomous robot navigation in complex, crowded environments, with potential implications for multi-agent systems and human-robot interaction."
cover_image: /assets/images/msc_projects/msc_project_template/jackal.jpg # Image displayed in the project's card, make it aspect ratio 1x1 (square) for best results, and keep it a reasonable size (like 1-2MB). Can also be a gif
links: # If you have other website for the project, github repos, datasets, etc. put it here. You can also add an icon from https://icons.getbootstrap.com/
    - name: Paper
      icon: bi-file-earmark-pdf
      url: "https://ieeexplore.ieee.org/abstract/document/10416788"
    - name: arXiv
      url: "https://arxiv.org/abs/2309.14931"
    - name: Model
      url: "https://surfdrive.surf.nl/files/index.php/s/jUdiLvFaHmRurhB"
    - name: Dataset
      url: "https://surfdrive.surf.nl/files/index.php/s/gGtnneEa5BFDtOW"
    - name: Code
      icon: bi-github
      url: "https://github.com/eliatrevisan/IA-MPPI-LBM"
    - name: Video
      icon: bi-youtube
      url: "https://www.youtube.com/watch?v=geDkL3rEM7U"
---

<div class="teaser-video d-flex justify-content-center">
  <div class="ratio ratio-16x9">
    <video id="teaser" autoplay="" muted="" controls="" loop="" playsinline="">
      <source src="{% include fix_link.html link='/assets/images/papers/ia_mppi/LBM_IAMPPI.mp4' %}" type="video/mp4">
    </video>
  </div>
</div>

## Abstract
Motion planning for autonomous robots in tight, interaction-rich, and mixed human-robot environments is challenging. State-of-the-art methods typically separate prediction and planning, predicting other agents’ trajectories first and then planning the ego agent’s motion in the remaining free space. However, agents’ lack of awareness of their influence on others can lead to the freezing robot problem. We build upon Interaction-Aware Model Predictive Path Integral (IAMPPI) control and combine it with learning-based trajectory predictions, thereby relaxing its reliance on communicated short-term goals for other agents. We apply this framework to Autonomous Surface Vessels (ASVs) navigating urban canals. By generating an artificial dataset in real sections of Amsterdam’s canals, adapting and training a prediction model for our domain, and proposing heuristics to extract local goals, we enable effective cooperation in planning. Our approach improves autonomous robot navigation in complex, crowded environments, with potential implications for multi-agent systems and human-robot interaction.


<div class="row row-cols-1 row-cols-sm-2 row-cols-md-2 g-2">
  <div class="col">
    <img class="img-fluid object-fit-contain" src="{% include fix_link.html link='/assets/images/papers/ia_mppi/framework.png' %}" alt="Image 1">
  </div>
  <div class="col">
  <div class=" ms-2">
  <h2>Framework</h2>
  <p>
    Firstly, the prediction model utilizes information from all elements in the scene to forecast trajectories for obstacle agents. Meanwhile, the global planner, equipped with the map, start, and goal positions, generates a path for the ego agent. Subsequently, the local goal extractor leverages this information to determine appropriate local goals for the motion planner. With inputs derived from the scene and the local goals, the Interaction-Aware Model Predictive Path Integral (IA-MPPI) algorithm simultaneously plans and predicts input sequences for all agents in the scene. The first input of the sequence is then assigned to the ego agent, and the algorithm iterates.
  </p>
  </div>
  </div>
</div>


