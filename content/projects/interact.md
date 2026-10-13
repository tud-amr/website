---
title: "INTERACT: Intuitive Interaction for Robots among Humans"
project_id: interact # ID of the project, used by publications to display in this project.
belongs_to_areas: [social-robots, mobile-manipulation] # List of area IDs, separated by commas.
date: 2022-09-01 # started date, approximated if not sure. Just for display purposes and ordering
description: >- # >- this means to ignore newlines until next field. This is the project description, displayed in the project's card"
  In this project, interactions of mobile robots and humans is key. This concept is considered on multiple spatio-temporal granularities ranging from individual interactions to the macro interaction of a robot fleet with humans, and from short term (local) to long term (global) effects of the interaction. 
image: /assets/images/projects/interact/INTERACT_picture.png
links: # If you have a website for the project, repos, etc. put it here.
    - name: "Github: Fabrics Implementation"
      url: "https://github.com/tud-amr/fabrics"
    - name: "Github: multi-agent fabrics"
      url: "https://github.com/tud-amr/multi-robot-fabrics"
fundings: This project has received funding from the European Union through an ERC Starting Grant.
people: # If you put your name in the same way you have it in your _people entry, your preferred link will be added. extra_info is optional.
    - name: Saray Bakker 
      extra_info: PhD candidate
    - name: Andreu Matoses Gimenez
      extra_info: PhD candidate
    - name: Dr. Gang (Clarence) Chen
      extra_info: Postdoctoral researcher
    - name: Max Spahn
      extra_info: Postdoctoral researcher
    - name: Dr. Nils Wilde
      extra_info: Postdoctoral researcher
    - name: Tomas Merva
      extra_info: Visiting PhD candidate
    - name: Prof. Wendelin Bohmer 
      extra_info: Key collaborator
    - name: Prof. Chris Pek 
      extra_info: Key collaborator
    - name: Prof. Javier Alonso-Mora
    # extra_info: Autonomous Multi-Robot Lab (AMR) TU Delft
---
<!-- Here you put the main body of the page, in markdown. You can also mix in html, or change this .md to .html -->
<!-- The fields of People, Funding, Links and Publications will be generated automatically -->

## About the Project

INTERACT aims to equip mobile robots with the ability to navigate and operate safely in human-populated environments. Leveraging advancements in motion planning, multi-robot task assignment, and machine learning, this project seeks to overcome the challenges of modeling intuition and ensuring safety in complex, uncertain settings. By developing intuitive models from past interactions and integrating them into novel optimization methods, INTERACT will enable robots to perform seamless, interaction-aware navigation and task planning. This foundational work paves the way for a new era of automation in both industrial and urban settings, where robots and humans can coexist harmoniously.

INTERACT works mainly on three parts: 1) Perception of the dynamic and open-world environment; 2) Task and motion planning (rename, Andreu); 3) Motion planning and control (rename, Saray).


### Perception of the dynamic and open-world environment
The perception system consists of a local mapping layer and a global mapping layer. The local mapping layer focuses on modeling ego-centric local environments under highly dynamic conditions, where moving entities such as pedestrians continuously change the scene structure. To address this challenge, we first proposed a particle-based occupancy representation named the [DSP Map](https://autonomousrobots.nl/assets/files/publications/23-chen-tro.pdf), which models dynamic environments from RGB-D point cloud observations. The DSP Map is built upon Random Finite Set (RFS) theory and the Sequential Monte Carlo Probability Hypothesis Density (SMC-PHD) filter, enabling unified probabilistic modeling of dynamic objects with arbitrary shapes. To further improve robustness and reconstruction accuracy, we extended this framework by incorporating semantic information and proposed the [Semantic-DSP Map](https://autonomousrobots.nl/assets/files/publications/23-chen-tro.pdf). The method introduces an S2MC-PHD filter that jointly handles uncertainty from both depth observations and semantic predictions, enabling more reliable dynamic environment representation in complex real-world scenes.

The global mapping layer focuses on open-world object recognition and long-term environment representation. We proposed [OpenSGA](https://autonomousrobots.nl/paper_websites/opensga), a framework for constructing 3D scene graphs from posed RGB-D observations. Building upon these scene graphs, we developed a graph alignment framework based on Graph Neural Networks (GNNs) and attention mechanisms to establish object correspondences across different observations. This enables the system to re-recognize previously observed objects by jointly leveraging open-set visual-semantic features and contextual scene relationships.

### Task and motion planning

We develop task and motion planning (TAMP) algorithms that enable robotic systems to autonomously decide high-level actions along with the associated motions. Previous research into TAMP algorithms has several simplifications and often does not account for robot dynamics or limitations of low-level controllers. This project uses GPU-based physics simulators to find high-quality and low-cost realizations that can be directly implemented on the real system, as they account for complex interactions with the environment. More information can be found in the related publication: [Parallel Realization of Task and Motion Plans](https://autonomousrobots.nl/assets/files/publications/26-matoses-ral.pdf).

Two examples are shown below: (1) a pick-and-place problem (move, pick, move, place, move) with a central obstacle that can yield more efficient solutions, and (2) a move-and-push problem where the robot must find the best way to push a stick with an object on top so that it reaches its symbolic goal (inside the box).

<div class="row g-4 align-items-start mt-2 mb-5">
  <div class="col-12">
    <h5 class="mb-3">(1) Pick and place</h5>
  </div>
  <div class="col-12 col-md-6">
    <h6 class="mb-1">Simulation</h6>
    <p class="small text-muted mb-2">Cross-entropy evolution and simulated solution for two different obstacles.</p>
    <div class="ratio ratio-16x9">
      <video controls muted autoplay loop playsinline preload="metadata">
        <source src="{{ '/assets/images/papers/26-matoses-ral/p_and_p_ce_sim_lowres.mp4' | relative_url }}" type="video/mp4">
      </video>
    </div>
  </div>
  <div class="col-12 col-md-6">
    <h6 class="mb-1">Real robot</h6>
    <p class="small text-muted mb-2">Real-robot execution.</p>
    <div class="ratio ratio-16x9">
      <video controls muted autoplay loop playsinline preload="metadata">
        <source src="{{ '/assets/images/papers/26-matoses-ral/x3_PandP_real_ramp_lowres.mp4' | relative_url }}" type="video/mp4">
      </video>
    </div>
  </div>

  <div class="col-12 mt-3">
    <h5 class="mb-3">(2) Move and push</h5>
  </div>
  <div class="col-12 col-md-6">
    <h6 class="mb-1">Simulation</h6>
    <p class="small text-muted mb-2">Cross-entropy evolution for two stick locations and simulated solution.</p>
    <div class="ratio ratio-16x9">
      <video controls muted autoplay loop playsinline preload="metadata">
        <source src="{{ '/assets/images/papers/26-matoses-ral/push_ce_sim_lowres.mp4' | relative_url }}" type="video/mp4">
      </video>
    </div>
  </div>
  <div class="col-12 col-md-6">
    <h6 class="mb-1">Real robot</h6>
    <p class="small text-muted mb-2">Real-robot execution.</p>
    <div class="ratio ratio-16x9">
      <video controls muted autoplay loop playsinline preload="metadata">
        <source src="{{ '/assets/images/papers/26-matoses-ral/x3_push_real_stick_on_right_lowres.mp4' | relative_url }}" type="video/mp4">
      </video>
    </div>
  </div>
</div>

### Motion planning and control (rename, Saray)


We also model interactions between agents with game theory. Details can be found [here](https://autonomousrobots.nl/projects/game-theoretic-mp).

<!-- One recent contribution from this project has been development of task and motion planning (TAMP) algorithms which are used in robotic systems to autonomously decide the high-level actions along with the associated motions. Previous research into TAMP algorithms have several simplifications and often do not account for robot dynamics or issues with low-level controllers. This project uses GPU based physics simulators to find high-quality realizations which can be directly implemented in the real system as it accounts for robot dynamics. Experimental results validated the effectiveness of this algorithm for a pick and place task while finding low-cost feasible solutions in 1-2 minutes. 

Another problem addressed in this project is that of real-time motion planning for multiple robotic manipulators in close proximity of each other. A novel method called multi-robot dynamics fabrics(MRDF) is developed which uses dynamic fabrics that rely on differential equations to solve for local motion planning. This method enables higher replanning frequencies and makes it useful for complex systems in dynamic environments. An online local motion planning algorithm is built that can enable multiple manipulators to operate in a shared workspace. The method is then validated in several pick-and-place scenarios obtaining high success rates and a real-time performance.    -->



## Project Demonstrations

<div class="ratio ratio-16x9">  
  <iframe src="https://www.youtube.com/embed/AldMFKnlW3M?si=X570HkJbSm7nanBI&mute=1" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen>
  </iframe>
</div>

## Funding & Partners

This project has received funding from the European Union through ERC, INTERACT, under Grant 101041863. Views and opinions expressed are, however, those of the author(s) only and do not necessarily reflect those of the European Union. Neither the European Union nor the granting authority can be held responsible for them.
