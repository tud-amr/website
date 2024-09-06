---
title: "TRiLOGy: Sustainable Transportation and Logistics Over Water: Electrification, Automation, and Optimization"
project_id: trilogy # ID of the project, used by publications to display in this project.
belongs_to_areas: [autonomous-vehicles] # List of area IDs, separated by commas.
date: 2020-09-01
end_date: 2025-01-15
description: >- # >- this means to ignore newlines until next field. This is the short project description, displayed in the project's card"
  Together with industry partners, we develop motion planning algorithms to navigate urban canals accounting for the interactions with other vessels.
image: /assets/images/projects/trilogy/vessels_planning.png
links: # If you have a website for the project, repos, etc. put it here.
    - name: MPPI-ISAAC Implementation
      url: "https://github.com/tud-airlab/mppi-isaac"
    - name: MPPI-ISAAC Webpage
      url: "https://sites.google.com/view/mppi-isaac/"
fundings: NWO Top Sector Water & Maritime: the Blue route
people: # If you put your name in the same way you have it in your _people entry, your preferred link will be added. extra_info is optional.
    - name: Elia Trevisan 
      extra_info: PhD candidate
    - name: Prof. Javier Alonso-Mora
    #  extra_info: Autonomous Multi-Robot Lab (AMR) TU Delft
    - name: Prof. Bilge Atasoy
      extra_info: Key collaborator.
---
<!-- Here you put the main body of the page, in markdown. You can also mix in html, or change this .md to .html -->
<!-- The fields of People, Funding, Links and Publications will be generated automatically -->

## About the Project

TRiLOGy will unlock the potential of transportation and logistics in urban waterways with electric and autonomous vessels by enabling safer, more sustainable and efficient operations. The project aims at developing autonomy tools for navigation in inland waterways, among other manned and unmanned vessels. The main challenges to ensure safe and efficient navigation of autonomous vessels in urban waters is that of generating safe trajectories that (i) take into account the goals expressed by the high-level integrated strategy, (ii) take into account the complex dynamics of the vessel and (iii) coordinate with other traffic participants.

The project introduced a motion planning framework for autonomous surface vessels(ASVs) that accounts for dynamic and static obstacles while generating motion plans in real-time. The method also incorporates regulation awareness into the planning stage so that the vessels comply with rules while interacting with other vessels. A model predictive contouring controller is used which includes a cost function that encourages adherence to regulations in various scenarios. The framework is then demonstrated in an outdoor environment with disturbances to validate its use. 

This project also presented a method for solving optimal control problems using the physics simulator IsaacGym as a dynamical model. A model predictive path integral controller (MPPI) is implemented using IsaacGym that can take hundreds of samples and make it feasible as a tool to solve a variety of contact-rich tasks. This is a type of sampling based model predictive controller which makes this algorithm suited for systems with non-linear discontinous dynamics. Simulations were run to show the model's ability to solve tasks like pushing and mobile manipulation for picking. 


## Project Demonstrations

<div class="video-wrapper ratio ratio-16x9"> 
  <iframe width="560" height="315" src="https://www.youtube.com/embed/Yq0XDarHX18?si=ED0joEFSmc3RWOOt&mute=1" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
</div>
<div class="video-wrapper ratio ratio-16x9">  
  <iframe width="560" height="315" src="https://www.youtube.com/embed/ovLZmSd-XX8?si=8dpVNsOdYn6p3Ecb&mute=1" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
</div>

## Funding & Partners

This project is funded by the NWO Top Sector Water & Maritime: the Blue route, 'Sustainable Transportation and Logistics over Water: Electrification, Automation and Optimization (TRiLOGy)'.

<div class="d-flex flex-row gap-2 flex-wrap justify-content-evenly mb-4 mt-4">
  <a itemprop="url" href="https://www.amsterdam.nl/">
  <img class="img-flex" height="70" src="{% include fix_link.html link='/assets/images/projects/trilogy/gemeente.png' %}" alt="Municipality of Amsterdam">
  </a>
  <a itemprop="url" href="https://www.ams-institute.org/">
  <img class="img-flex" height="70" src="{% include fix_link.html link='/assets/images/projects/trilogy/ams.png' %}" alt="AMS Institute">
  </a>
  <a itemprop="url" href="https://www.flying-fish.tech/">
  <img class="img-flex" height="70" src="{% include fix_link.html link='/assets/images/projects/trilogy/flying_fish.png' %}" alt="Flying Fish">
  </a>
  <a itemprop="url" href="https://demcon-unmanned.nl/">
  <img class="img-flex" height="70" src="{% include fix_link.html link='/assets/images/projects/trilogy/demcon.png' %}" alt="Municipality of Amsterdam">
  </a>
  <a itemprop="url" href="https://www.zoevcity.nl/">
  <img class="img-flex" height="70" src="{% include fix_link.html link='/assets/images/projects/trilogy/zoev.jpeg' %}" alt="Zoev City">
  </a>
  <a itemprop="url" href="https://rasdelft.nl/">
  <img class="img-flex" height="70" src="{% include fix_link.html link='/assets/images/projects/trilogy/ras.png' %}" alt="Researchlab Autonomous Shipping">
  </a>
</div>
