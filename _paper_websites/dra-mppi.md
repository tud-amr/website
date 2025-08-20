---
title: "Dynamic Risk-Aware MPPI for Mobile Robots in Crowds via Efficient Monte Carlo Approximations"
authors:

    - name: "Elia Trevisan*"
      url: "https://www.linkedin.com/in/eliatrevisan/"
      superscript: ",1"
    - name: "Khaled A. Mustafa*"
      url: "https://scholar.google.com/citations?user=Ly6XqEYAAAAJ&hl=en"
      superscript: ",1"
    - name: "Godert Notten"
      url: "https://www.linkedin.com/in/godert-notten-5362ba129/"
      superscript: "1,2"
    - name: "Xinwei Wang"
      url: "https://scholar.google.co.uk/citations?user=jcXiTVAAAAAJ&hl=en"
      superscript: "3"
    - name: "Javier Alonso-Mora"
      url: "https://www.autonomousrobots.nl/"
      superscript: "1"
    
affiliations:
    - name: "Equal contribution"
      superscript: "*"
    - name: "TU Delft"
      superscript: "1"
      url: "https://tudelft.nl"
    - name: "Damen Naval"
      superscript: "2"
      url: "https://www.damen.com/"
    - name: "Queen Mary University of London"
      superscript: "3"
      url: "https://www.qmul.ac.uk/"
    # - name: "Wien Opera House"
    #   superscript: "†"
release_date: 2025-06-26 # publication or relevant date, approximated if not sure. Just for display purposes and ordering.
links: # If you have other website for the project, github repos, datasets, etc. put it here. You can also add an icon from https://icons.getbootstrap.com/
    - name: IEEE Xplore (coming soon)
      icon: bi-file-earmark-pdf
      # url: "https://doi.org/10.1109/LRA.2025.3535185"
    - name: arXiv
      icon: bi-file-earmark-pdf
      url: "https://arxiv.org/abs/2506.21205"
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

<h2 align="center">Real-Robot Experiment with Pedestrians</h2>
<div class="teaser-video d-flex justify-content-center">
  <div class="ratio ratio-16x9">
    <video id="teaser" autoplay="" muted="" controls="" loop="" playsinline="">
      <source src="{% include fix_link.html link='/assets/images/papers/dra-mppi/dra_side.mp4' %}" type="video/mp4">
    </video>
  </div>

</div>
<p align="justify">
  A Clearpath Jackal using our approach navigates among pedestrians while <span class="amr-color">minimizing its Collision Probability (CP)</span> as well as mantaining the <span class="amr-color">CP below a desired threshold</span>. Pedestrians, tracked via motion capture, have their uncertain future motion predicted by a uni-modal Gaussian Distribution.
</p>

<h2> Abstract </h2>
<p align="justify">
Deploying mobile robots safely among humans requires the motion planner to account for the uncertainty in the other agents' predicted trajectories. This remains challenging in traditional approaches, especially with arbitrarily shaped predictions and real-time constraints.
To address these challenges, we propose a Dynamic Risk-Aware Model Predictive Path Integral control (<span class="amr-color">DRA-MPPI</span>), a motion planner that <span class="amr-color">incorporates uncertain future motions</span> modelled with <span class="amr-color">potentially non-Gaussian stochastic predictions</span>. By leveraging MPPI’s gradient-free nature, we propose a method that efficiently approximates the joint Collision Probability (CP) among multiple dynamic obstacles for several hundred sampled trajectories in real-time via a Monte Carlo (MC) approach.
This enables the rejection of samples exceeding a predefined CP threshold or the integration of CP as a weighted objective within the navigation cost function. Consequently, DRA-MPPI mitigates the freezing robot problem while enhancing safety. Real-world and simulated experiments with multiple dynamic obstacles demonstrate DRA-MPPI’s superior performance compared to state-of-the-art approaches, including Scenario-based Model Predictive Control (S-MPC), Frenét planner, and vanilla MPPI.
</p>

<h2> Comparisons with <span class="amr-color">Non-Gaussian Predictions</span> </h2>
<p align="justify">
Although not visualized in the video, all pedestrians are predicted to have a small chance of turning left any future time-step. This is modeled with a Gaussian Mixture Model. Below is a video comparison to a state-of-the-art Scenario-Based MPC [de Groot, 2023], more comparisons are provided in the tables and figures of the paper.
</p>
<div class="row row-cols-1 row-cols-sm-2 row-cols-md-2 g-2">
  <div class="col">
    <h5 align="center">DRA-MPPI (Ours)</h5>
    <div class="teaser-video d-flex justify-content-center">
      <div class="ratio ratio-16x9">
        <video id="teaser" autoplay="" muted="" controls="" loop="" playsinline="">
          <source src="{% include fix_link.html link='/assets/images/papers/dra-mppi/mppi_mm_2exp.mp4' %}" type="video/mp4">
        </video>
      </div>
    </div>
  </div>
  <div class="col">
    <h5 align="center">Scenario-Based MPC</h5>
    <div class="teaser-video d-flex justify-content-center">
      <div class="ratio ratio-16x9">
        <video id="teaser" autoplay="" muted="" controls="" loop="" playsinline="">
          <source src="{% include fix_link.html link='/assets/images/papers/dra-mppi/mpc_mm_2exp.mp4' %}" type="video/mp4">
        </video>
      </div>
    </div>
  </div>
</div>

<h2> Comparisons with <span class="amr-color">Gaussian Predictions</span> </h2>
<p align="justify">
Below are the video comparisons showing a Jackal robot navigating a corridor with an increasing number of pedestrians. Pedestrian motion is simulated with a social forces model, but are predicted by the robot by a Gaussian distribution centered on a constant velocity model. This mismatch is added to make the simulation more realistic, as the prediction will not perfectly match actual motion. Comparisons with several other approaches are presented in the tables and figures in our paper. 
</p>

<div class="row row-cols-1 row-cols-sm-2 row-cols-md-2 g-2">
  <div class="col">
    <h5 align="center">DRA-MPPI (Ours)</h5>
    <div class="teaser-video d-flex justify-content-center">
      <div class="ratio ratio-16x9">
        <video id="teaser" autoplay="" muted="" controls="" loop="" playsinline="">
          <source src="{% include fix_link.html link='/assets/images/papers/dra-mppi/mppi_4obs_1exp.mp4' %}" type="video/mp4">
        </video>
      </div>
    </div>
    <p align="center">Four pedestrians</p>
  </div>
  <div class="col">
    <h5 align="center">Scenario-Based MPC</h5>
    <div class="teaser-video d-flex justify-content-center">
      <div class="ratio ratio-16x9">
        <video id="teaser" autoplay="" muted="" controls="" loop="" playsinline="">
          <source src="{% include fix_link.html link='/assets/images/papers/dra-mppi/mpc_4obs_1exp.mp4' %}" type="video/mp4">
        </video>
      </div>
    </div>
    <p align="center">Four pedestrians</p>
  </div>
</div>


<div class="row row-cols-1 row-cols-sm-2 row-cols-md-2 g-2">
  <div class="col">
    <div class="teaser-video d-flex justify-content-center">
      <div class="ratio ratio-16x9">
        <video id="teaser" autoplay="" muted="" controls="" loop="" playsinline="">
          <source src="{% include fix_link.html link='/assets/images/papers/dra-mppi/mppi_8obs_2exps.mp4' %}" type="video/mp4">
        </video>
      </div>
    </div>
    <p align="center">Eight pedestrians</p>
  </div>
  <div class="col">
    <div class="teaser-video d-flex justify-content-center">
      <div class="ratio ratio-16x9">
        <video id="teaser" autoplay="" muted="" controls="" loop="" playsinline="">
          <source src="{% include fix_link.html link='/assets/images/papers/dra-mppi/mpc_8obs_2exps.mp4' %}" type="video/mp4">
        </video>
      </div>
    </div>
    <p align="center">Eight pedestrians</p>
  </div>
</div>

<div class="row row-cols-1 row-cols-sm-2 row-cols-md-2 g-2">
  <div class="col">
    <div class="teaser-video d-flex justify-content-center">
      <div class="ratio ratio-16x9">
        <video id="teaser" autoplay="" muted="" controls="" loop="" playsinline="">
          <source src="{% include fix_link.html link='/assets/images/papers/dra-mppi/mppi_12obs_2exps.mp4' %}" type="video/mp4">
        </video>
      </div>
    </div>
    <p align="center">Twelve pedestrians</p>
  </div>
  <div class="col">
    <div class="teaser-video d-flex justify-content-center">
      <div class="ratio ratio-16x9">
        <video id="teaser" autoplay="" muted="" controls="" loop="" playsinline="">
          <source src="{% include fix_link.html link='/assets/images/papers/dra-mppi/mpc_12obs_2exps.mp4' %}" type="video/mp4">
        </video>
      </div>
    </div>
    <p align="center">Twelve pedestrians</p>
  </div>
</div>

