---
title: "Decentralized Aerial Manipulation of a Cable-Suspended Load Using Multi-Agent Reinforcement Learning"
authors:
    - name: "Jack Zeng"
      url: "https://jackzeng-robotics.github.io/"
      superscript: "1"
    - name: "Andreu Matoses Gimenez"
      url: "https://andreumatoses.github.io/"
      superscript: "1"
    - name: "Eugene Vinitsky"
      url: "https://www.eugenevinitsky.com/"
      superscript: "2"
    - name: "Javier Alonso-Mora"
      url: "https://autonomousrobots.nl/people/"
      superscript: "1"
    - name: "Sihao Sun"
      url: "https://sihaosun.github.io/"
      superscript: "1"
affiliations:
    # - name: "Equal contribution"
    #   superscript: "*"
    - name: "TU Delft"
      superscript: "1"
      url: "https://tudelft.nl"
    - name: "New York University"
      superscript: "2"
      url: "https://nyu.edu"
release_date: 2025-08-01 # publication or relevant date, approximated if not sure. Just for display purposes and ordering.
links: # If you have other website for the project, github repos, datasets, etc. put it here. You can also add an icon from https://icons.getbootstrap.com/
    - name: arXiv (coming soon)
      icon: bi-file-earmark-pdf
      url: ""
    - name: Code (coming soon)
      icon: bi-github
      url: "" 
    - name: Video
      icon: bi-youtube
      url: "https://youtu.be/NLYVruRREyI"
    - name: MSc Thesis
      icon: bi-file-text
      url: "https://resolver.tudelft.nl/uuid:0e1d8dae-4592-4209-be5d-6aac10057491"
    - name: Related Publications
      icon: bi-file-text
      url: "#related-publications"
related_project_id: ""
---

<h3>Real-world experimental results</h3>
<p align="justify">
From left to right, top to bottom, the videos below show 1) Full-pose manipulation with 3 MAVs, 2) Robustness against complete in-flight failure of one MAV, 3) Full-pose manipulation with 4 MAVs, 4) Robstuness against unknown disturbances (15.4% of original load mass) placed in the load, which are free to move around, 5) Robustness against hetereogeneous agent setups, where one hacked MAV is commanded around with a different controller, and 6) Trajectory tracking of a figure-8. <span class="amr-color">Note that</span> our method is <span class="amr-color">not</span> trained for trajectory tracking. The entire pipeline is executed <span class="amr-color">onboard</span>, with the policies running at 100 Hz, and the low-level controller running at 300 Hz. Importantly, we achieve (near) <span class="amr-color">constant computation time</span> as we scale up the number of agents, and achieve similar tracking performance to a centralized NMPC benchmark.

</p>
<div class="row row-cols-1 row-cols-sm-2 row-cols-md-2 g-2">
  <div class="col">
    <div class="teaser-video d-flex justify-content-center">
      <div class="ratio ratio-16x9">
        <video id="teaser1" autoplay="" muted="" controls="" loop="" playsinline="">
          <source src="{% include fix_link.html link='/assets/images/papers/aerial-manipulation-marl/full_pose_3.mp4' %}" type="video/mp4">
        </video>
      </div>
    </div>
    <p align="center"> 
    </p>
  </div>
  <div class="col">
    <div class="teaser-video d-flex justify-content-center">
      <div class="ratio ratio-16x9">
        <video id="teaser2" autoplay="" muted="" controls="" loop="" playsinline="">
          <source src="{% include fix_link.html link='/assets/images/papers/aerial-manipulation-marl/failure_agent.mp4' %}" type="video/mp4">
        </video>
      </div>
    </div>
    <p align="center">
    </p>
  </div>
  <div class="col">
    <div class="teaser-video d-flex justify-content-center">
      <div class="ratio ratio-16x9">
        <video id="teaser3" autoplay="" muted="" controls="" loop="" playsinline="">
          <source src="{% include fix_link.html link='/assets/images/papers/aerial-manipulation-marl/full_pose_4.mp4' %}" type="video/mp4">
        </video>
      </div>
    </div>
    <p align="center">
    </p>
  </div>
  <div class="col">
    <div class="teaser-video d-flex justify-content-center">
      <div class="ratio ratio-16x9">
        <video id="teaser4" autoplay="" muted="" controls="" loop="" playsinline="">
          <source src="{% include fix_link.html link='/assets/images/papers/aerial-manipulation-marl/unknown_disturbances.mp4' %}" type="video/mp4">
        </video>
      </div>
    </div>
    <p align="center">
    </p>
  </div>
  <div class="col">
    <div class="teaser-video d-flex justify-content-center">
      <div class="ratio ratio-16x9">
        <video id="teaser5" autoplay="" muted="" controls="" loop="" playsinline="">
          <source src="{% include fix_link.html link='/assets/images/papers/aerial-manipulation-marl/heterogeneous_agent.mp4' %}" type="video/mp4">
        </video>
      </div>
    </div>
    <p align="center">
    </p>
  </div>
  <div class="col">
    <div class="teaser-video d-flex justify-content-center">
      <div class="ratio ratio-16x9">
        <video id="teaser6" autoplay="" muted="" controls="" loop="" playsinline="">
          <source src="{% include fix_link.html link='/assets/images/papers/aerial-manipulation-marl/trajectory_top.mp4' %}" type="video/mp4">
        </video>
      </div>
    </div>
    <p align="center">
    </p>
  </div>
</div>

<h3> Abstract </h3>
This paper presents the first decentralized method to enable real-world 6-DoF manipulation of a cable-suspended load using a team of Micro-Aerial Vehicles (MAVs). Our method leverages multi-agent reinforcement learning (MARL) to train an outer-loop control policy for each MAV. Unlike state-of-the-art controllers that utilize a centralized scheme, our policy does not require global states, inter-MAV communications, nor neighboring MAV information. Instead, agents communicate implicitly through load pose observations alone, which enables high scalability and flexibility. It also significantly reduces computing costs during inference time, enabling onboard deployment of the policy. In addition, we introduce a new action space design for the MAVs using linear acceleration and body rates. This choice, combined with a robust low-level controller, enables reliable sim-to-real transfer despite significant uncertainties caused by cable tension during dynamic 3D motion. We validate our method in various real-world experiments, including full-pose control under load model uncertainties, showing setpoint tracking performance comparable to the state-of-the-art centralized method. We also demonstrate cooperation amongst agents with heterogeneous control policies, and robustness to the complete in-flight loss of one MAV.

<h3> Conclusion </h3>
We introduced a decentralized method using MARL that allows for full-pose control of a cable-suspended load using three MAVs without any inter-MAV communication or neighboring MAV information. The policy is computationally tractable, scales (near) constant with the number of agents, and executes entirely onboard. We proposed a novel action space of accelerations and body rates (ACCBR) along with a robust low-level controller and showcase zero-shot transfer from simulation to real-world deployment. Extensive testing with real MAVs shows that the setpoint tracking performance of our method is comparable to that of the state-of-the-art centralized NMPC, despite being fully decentralized and having significantly lower computation time. Our method demonstrates robustness against unknown disturbances, heterogeneous agents, and even the complete in-flight failure of one MAV. We attribute this resilience to two key factors: <span class="amr-color">1)</span> closed-loop reference tracking by the low-level controller, which maintains stability despite perturbations, <span class="amr-color">2)</span> decentralized policy independence, where local agents operate <span class="amr-color">without dependence on neighboring states</span>, preventing cascading failures. Our work shows promising results to enable scalable and robust cooperative aerial manipulation with minimal onboard sensing and no internal communications required.
