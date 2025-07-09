---
title: "Active Disturbance Rejection Control (ADRC) for Trajectory Tracking of a Seagoing USV: Design, Simulation, and Field Experiments"
authors:
    - name: "Jelmer van der Saag"
      url: "https://www.linkedin.com/in/jelmer-van-der-saag/"
      superscript: "1,2"
    - name: "Elia Trevisan"
      url: "https://www.linkedin.com/in/eliatrevisan/"
      superscript: "1"
    - name: "Wouter Falkena"
      superscript: "2"
    - name: "Javier Alonso-Mora"
      url: "https://www.autonomousrobots.nl/"
      superscript: "1"
    
affiliations:
    - name: "TU Delft"
      superscript: "1"
      url: "https://tudelft.nl"
    - name: "Demcon Unmanned Systems"
      superscript: "2"
      url: "https://demcon-unmanned.nl/"
    # - name: "Wien Opera House"
    #   superscript: "†"
release_date: 2025-06-27 # publication or relevant date, approximated if not sure. Just for display purposes and ordering.
links: # If you have other website for the project, github repos, datasets, etc. put it here. You can also add an icon from https://icons.getbootstrap.com/
    - name: IEEE Xplore (coming soon)
      icon: bi-file-earmark-pdf
      # url: "https://doi.org/10.1109/LRA.2025.3535185"
    - name: arXiv
      icon: bi-file-earmark-pdf
      url: "https://arxiv.org/abs/2506.21265"
    # - name: Code
    #   icon: bi-github
    #   url: "https://github.com/tud-airlab/mppi-isaac"
    # - name: Video (coming soon)
    #   icon: bi-youtube
      # url: "https://www.youtube.com/watch?v=ovLZmSd-XX8"
    - name: Related Publications
      icon: bi-file-text
      url: "#related-publications"
related_project_id: "trilogy"
---



<div class="ratio ratio-16x9">
    <iframe src="https://www.youtube.com/embed/664NpYXnbgk" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
    <!-- <iframe src="https://www.youtube.com/embed/?listType=playlist&list=PLOksz-MTFhN2T4gYQlLHR2lGCdC0BDkJw&" allowfullscreen></iframe> -->
</div>


<h3> Abstract </h3>
<p align="justify">
Unmanned Surface Vessels (USVs) face significant control challenges due to uncertain environmental disturbances like waves and currents. This paper proposes a trajectory tracking controller based on Active Disturbance Rejection Control (ADRC) implemented on the DUS V2500. A custom simulation incorporating realistic waves and current disturbances is developed to validate the controller's performance, supported by further validation through field tests in the harbour of Scheveningen, the Netherlands, and at sea. Simulation results demonstrate that ADRC significantly reduces cross-track error across all tested conditions compared to a baseline PID controller but increases control effort and energy consumption. Field trials confirm these findings while revealing a further increase in energy consumption during sea trials compared to the baseline. 
</p>

