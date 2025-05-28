---
title: "TRiLOGy: Sustainable Transportation and Logistics Over Water: Electrification, Automation, and Optimization"
project_id: trilogy # ID of the project, used by publications to display in this project.
belongs_to_areas: [autonomous-vehicles] # List of area IDs, separated by commas.
date: 2020-09-01 # started date, approximated if not sure. Just for display purposes and ordering
end_date: 2025-01-15
description: >- # >- this means to ignore newlines until next field. This is the short project description, displayed in the project's card"
  Together with industry partners, we develop motion planning algorithms to navigate urban canals accounting for the interactions with other vessels.
image: /assets/images/projects/trilogy/vessels_planning.png
links: # If you have a website for the project, repos, etc. put it here.
    # - name: MPPI-ISAAC Implementation
    #   url: "https://github.com/tud-airlab/mppi-isaac"
    # - name: MPPI-ISAAC Webpage
    #  url: "https://sites.google.com/view/mppi-isaac/"
fundings: This project was funded by the NWO Top Sector Water & Maritime, the Blue route.
people: # If you put your name in the same way you have it in your _people entry, your preferred link will be added. extra_info is optional.
    - name: Elia Trevisan
      extra_info: PhD candidate
    - name: Prof. Bilge Atasoy
    #  extra_info: Universidad de Zaragoza
    - name: Prof. Javier Alonso-Mora
    # extra_info: Autonomous Multi-Robot Lab (AMR) TU Delft
---
<!-- Here you put the main body of the page, in markdown. You can also mix in html, or change this .md to .html -->
<!-- The fields of People, Funding, Links and Publications will be generated automatically -->

## About the Project

TRiLOGy aims to unlock the potential of transportation and logistics in urban waterways with electric and autonomous vessels by enabling safer, more sustainable and efficient operations. The project aims at developing autonomy tools for navigation in inland waterways, among other manned and unmanned vessels. The main challenges to ensure safe and efficient navigation of autonomous vessels in urban waters is that of generating safe trajectories that (i) take into account the goals expressed by the high-level integrated strategy, (ii) take into account the complex dynamics of the vessel and (iii) coordinate with other traffic participants.

The main outcomes of the project were in the development of a motion planning algorithm, based on Model Predictive Path Integral (MPPI) control, that is able to generate safe trajectories for autonomous vessels in urban canals. The algorithm is able to take into account the dynamics of the vessel, the interactions with other traffic participants, as well as navigation rules, while also being able to adapt to changing environments and unexpected obstacles. The algorithm is designed to be used in real-time, allowing for fast and efficient navigation in complex environments.

Other developments include a robust controller for autonomous vessels, which is able to track reference trajectories in the presence of disturbances such as wind, waves and currents, which was tested in both harbour and open sea environments. We also worked on data collection, learning-based predictions, and transfer of the developed algorithms to ground robots and manipulators.

## Project Demonstrations
We demonstrated our decentralized, rule- and interaction-aware MPPI planner running on-board two vessels.

<div class="row row-cols-1 row-cols-sm-2 row-cols-md-2 g-2">
  <div class="col">
    <h5 align="center">Crossing with Right-of-way</h5>
    <div class="teaser-video d-flex justify-content-center">
      <div class="ratio ratio-16x9">
        <video id="teaser" autoplay="" muted="" controls="" loop="" playsinline="">
          <source src="{% include fix_link.html link='/assets/images/projects/trilogy/crossing_compressed.mp4' %}" type="video/mp4">
        </video>
      </div>
    </div>
    <p align="center">
    </p>
  </div>
  <div class="col">
    <h5 align="center">Head-on Encounter</h5>
    <div class="teaser-video d-flex justify-content-center">
      <div class="ratio ratio-16x9">
        <video id="teaser" autoplay="" muted="" controls="" loop="" playsinline="">
          <source src="{% include fix_link.html link='/assets/images/projects/trilogy/headon3_compressed.mp4' %}" type="video/mp4">
        </video>
      </div>
    </div>
    <p align="center">
    </p>
  </div>
</div>

With experiments on ground robots, we have shown the reactivity of the planner to unexpected dynamic obstacles, as well as the ability to plan accounting for prediction uncertainty.

<div class="row row-cols-1 row-cols-sm-2 row-cols-md-2 g-2">
  <div class="col">
    <h5 align="center">Reactivity to Unexpected Obstacles</h5>
    <div class="teaser-video d-flex justify-content-center">
      <div class="ratio ratio-16x9">
        <video id="teaser" autoplay="" muted="" controls="" loop="" playsinline="">
          <source src="{% include fix_link.html link='/assets/images/papers/biased_mppi/bias8_with_samples.m4v' %}" type="video/mp4">
        </video>
      </div>
    </div>
    <p align="center">
    </p>
  </div>
  <div class="col">
    <h5 align="center">Risk-Aware Planning</h5>
    <div class="teaser-video d-flex justify-content-center">
      <div class="ratio ratio-16x9">
        <video id="teaser" autoplay="" muted="" controls="" loop="" playsinline="">
          <source src="{% include fix_link.html link='/assets/images/projects/trilogy/dra_side_compressed.mp4' %}" type="video/mp4">
        </video>
      </div>
    </div>
    <p align="center">
    </p>
  </div>
</div>

In collaboration with project partners, we have collected real-world data onboards ships. We have also genereated large artificial datasets that we used to train a prediction model for vessels in urban canals.

<div class="row row-cols-1 row-cols-sm-2 row-cols-md-2 g-2">
  <div class="col">
    <h5 align="center">Data Collection in Inland Waters</h5>
    <div class="teaser-video d-flex justify-content-center">
      <div class="ratio ratio-16x9">
        <video id="teaser" autoplay="" muted="" controls="" loop="" playsinline="">
          <source src="{% include fix_link.html link='/assets/images/projects/trilogy/turn_dataonly_spedup.mp4' %}" type="video/mp4">
        </video>
      </div>
    </div>
    <p align="center">
    </p>
  </div>
  <div class="col">
    <h5 align="center">Planner with Learning-Based Predictions</h5>
    <div class="teaser-video d-flex justify-content-center">
      <div class="ratio ratio-16x9">
        <video id="teaser" autoplay="" muted="" controls="" loop="" playsinline="">
          <source src="{% include fix_link.html link='/assets/images/projects/trilogy/LBM_IAMPPI_compressed.mp4' %}" type="video/mp4">
        </video>
      </div>
    </div>
    <p align="center">
    </p>
  </div>
</div>

In collaboration with Demcon, we have demonstrated a robust controller for reference tracking in harbour and open sea, showing good performance in the presence of wind, waves and currents.

<div class="row row-cols-1 row-cols-sm-2 row-cols-md-2 g-2">
  <div class="col">
    <h5 align="center">Robust Control in Hourbour</h5>
    <div class="teaser-video d-flex justify-content-center">
      <div class="ratio ratio-16x9">
        <video id="teaser" autoplay="" muted="" controls="" loop="" playsinline="">
          <source src="{% include fix_link.html link='/assets/images/projects/trilogy/harbour_compressed.mp4' %}" type="video/mp4">
        </video>
      </div>
    </div>
    <p align="center">
    </p>
  </div>
  <div class="col">
    <h5 align="center">Robust Control at Sea</h5>
    <div class="teaser-video d-flex justify-content-center">
      <div class="ratio ratio-16x9">
        <video id="teaser" autoplay="" muted="" controls="" loop="" playsinline="">
          <source src="{% include fix_link.html link='/assets/images/projects/trilogy/sea_compressed.mp4' %}" type="video/mp4">
        </video>
      </div>
    </div>
    <p align="center">
    </p>
  </div>
</div>

Collaborating across projects, we have shown that the same planner used on vessels can be successfully used on ground robots and manipulators in contact rich tasks.

<div class="row row-cols-1 row-cols-sm-2 row-cols-md-2 g-2">
  <div class="col">
    <h5 align="center">Omnidirectional Push w Disturbances</h5>
    <div class="teaser-video d-flex justify-content-center">
      <div class="ratio ratio-16x9">
        <video id="teaser" autoplay="" muted="" controls="" loop="" playsinline="">
          <source src="{% include fix_link.html link='/assets/images/papers/isaac_mppi/omnipush480p.m4v' %}" type="video/mp4">
        </video>
      </div>
    </div>
    <p align="center"> 
    </p>
  </div>
  <div class="col">
    <h5 align="center">Manipulator Push w Disturbances</h5>
    <div class="teaser-video d-flex justify-content-center">
      <div class="ratio ratio-16x9">
        <video id="teaser" autoplay="" muted="" controls="" loop="" playsinline="">
          <source src="{% include fix_link.html link='/assets/images/papers/isaac_mppi/pandapush480.m4v' %}" type="video/mp4">
        </video>
      </div>
    </div>
    <p align="center">
    </p>
  </div>
</div>


## Funding & Partners

This project is funded by the NWO Top Sector Water & Maritime: the Blue route, 'Sustainable Transportation and Logistics over Water: Electrification, Automation and Optimization (TRiLOGy)'.

<div class="d-flex flex-row gap-2 flex-wrap justify-content-evenly mb-4 mt-4">
  <a itemprop="url" href="https://www.amsterdam.nl/">
  <img class="img-flex" height="60" src="{% include fix_link.html link='/assets/images/projects/trilogy/gemeente.png' %}" alt="Municipality of Amsterdam">
  </a>
  <a itemprop="url" href="https://www.ams-institute.org/">
  <img class="img-flex" height="60" src="{% include fix_link.html link='/assets/images/projects/trilogy/ams.png' %}" alt="AMS Institute">
  </a>
  <a itemprop="url" href="https://www.flying-fish.tech/">
  <img class="img-flex" height="60" src="{% include fix_link.html link='/assets/images/projects/trilogy/flying_fish.png' %}" alt="Flying Fish">
  </a>
  <a itemprop="url" href="https://demcon-unmanned.nl/">
  <img class="img-flex" height="60" src="{% include fix_link.html link='/assets/images/projects/trilogy/demcon.png' %}" alt="Municipality of Amsterdam">
  </a>
  <a itemprop="url" href="https://www.zoevcity.nl/">
  <img class="img-flex" height="60" src="{% include fix_link.html link='/assets/images/projects/trilogy/zoev.jpeg' %}" alt="Zoev City">
  </a>
  <a itemprop="url" href="https://rasdelft.nl/">
  <img class="img-flex" height="60" src="{% include fix_link.html link='/assets/images/projects/trilogy/ras.png' %}" alt="Researchlab Autonomous Shipping">
  </a>
  <a itemprop="url" href="https://www.damen.com/">
  <img class="img-flex" height="60" src="{% include fix_link.html link='/assets/images/projects/trilogy/damen.jpg' %}" alt="Damen">
  </a>
</div>
