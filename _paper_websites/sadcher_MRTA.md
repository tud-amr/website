---
title: "SADCHER: Scheduling using Attention-based Dynamic Coalitions of Heterogeneous Robots in Real-Time"
permalink: /paper_websites/sadcher_MRTA/
authors:
    - name: "Jakob Bichler"
      url: "https://github.com/jakbichler"
      superscript: "1"
    - name: "Andreu Matoses Gimenez"
      url: "https://andreumatoses.github.io/"
      superscript: "1"
    - name: "Javier Alonso-Mora"
      url: "https://autonomousrobots.nl/people/"
      superscript: "1"
affiliations:
    # - name: "Equal contribution"
    #   superscript: "*"
    - name: "TU Delft"
      superscript: "1"
      url: "https://tudelft.nl"
release_date: 2025-10-01 # publication or relevant date, approximated if not sure. Just for display purposes and ordering.
links: # If you have other website for the project, github repos, datasets, etc. put it here. You can also add an icon from https://icons.getbootstrap.com/
    - name: arXiv (coming soon)
      icon: bi-file-earmark-pdf
      url: ""
    - name: Code (Pytorch) 
      icon: bi-github
      url: "https://github.com/jakbichler" 

    - name: Dataset 
      icon: bi-file-text
      url: "https://data.4tu.nl/datasets/10e28ee0-9ad9-450d-8be7-6e6a91f2931f" 
    - name: MSc Thesis
      icon: bi-file-text
      url: "https://resolver.tudelft.nl/uuid:d90491cd-cf57-4d29-b38d-88df646ab301"
related_project_id: "interact" # put the project id here if the work belongs to a project. This will add a "Related to project" box with a link to the project page.
---
<div style="text-align: justify;">
<div class="image-grid text-center mb-1">
    <div class="row row-cols-1 row-cols-sm-2g-1">
      <div class="col">
    <img class="img-fluid object-fit-contain" src="{% include fix_link.html link='/assets/images/papers/sadcher_MRTA/opening_image_new.png' %}" alt="Image 1" style="max-width: 90%; height: auto;">
      </div>
    </div>
  </div>
  <p class="text">
  </p>
<h3> Abstract </h3>
We present Sadcher, a real-time task assignment framework for heterogeneous multi-robot teams that incorporates dynamic coalition formation and task precedence constraints. Sadcher is trained through Imitation Learning and combines graph attention and transformers to predict assignment rewards between robots and tasks. Based on the predicted rewards, a relaxed bipartite matching step generates high-quality schedules with feasibility guarantees. We explicitly model robot and task positions, task durations, and robots’ remaining processing times, enabling advanced temporal and spatial reasoning and generalization to environments with different spatiotemporal distributions compared to training. Trained on optimally solved small-scale instances, our method can scale to larger task sets and team sizes. Sadcher outperforms other learning-based and heuristic baselines on randomized, unseen problems for small and medium-sized teams with computation times suitable for real-time operation. We also explore sampling-based variants and evaluate scalability across robot and task counts. In addition, we release our dataset of 250,000 optimal schedules to facilitate future research.



<h3> Method overview </h3>
The Sadcher framework consists of a neural network based
on attention mechanisms to predict assignment rewards for
robots to tasks that is agnostic to the size of the input graphs,
i.e., can handle arbitrary numbers of robots and tasks. A re-
laxed bipartite matching algorithm extracts task assignments
based on the predicted reward. During runtime, the method
asynchronously recomputes assignments at decision steps,
i.e., when robots finish tasks or new tasks are announced.
    Robot and task graphs are processed by graph attention and transformer encoders and concatenated with distance
    features. The reward matrix is estimated by the Idle and Reward MLPs and final task assignments are extracted using relaxed bipartite matching. B: batch
    size, N : number of robots, M : number of tasks, d_r : robot input dimension, d_t : task input dimension, d: latent dimension.

<div style="height: 2rem;"></div>
<div class="image-grid text-center mb-1">
    <div class="row row-cols-1 row-cols-sm-2g-1">
      <div class="col">
        <img class="img-fluid object-fit-contain" src="{% include fix_link.html link='/assets/images/papers/sadcher_MRTA/thesis_architecture_high_res.png' %}" alt="Image 1" style="max-width: 100%; height: auto;">
      </div>
    </div>
  </div>
  <p class="text">
  </p>

<h3>Simple Demo Video</h3>
<p align="justify">

<div class="image-grid text-center mb-1">
    <div class="row row-cols-1 row-cols-sm-2g-1">
      <div class="col">
    <img class="img-fluid object-fit-contain" src="{% include fix_link.html link='/assets/images/papers/sadcher_MRTA/sadcher.gif' %}" alt="Image 1" style="max-width: 70%; height: auto;">
      </div>
    </div>
  </div>
  <p class="text">
  </p>






<h3> Simulation Results </h3>
<div class="image-grid text-center mb-1">
    <div class="row row-cols-1 row-cols-sm-2g-1">
      <div class="col">
        <img class="img-fluid object-fit-contain" src="{% include fix_link.html link='/assets/images/papers/sadcher_MRTA/violin_without_travel_distance.png' %}" alt="Image 1" style="max-width: 100%; height: auto;">
      </div>
    </div>
  </div>
  <p class="text">
  </p>

Comparison on 500 unseen, randomized problem instances (8 tasks, 3 robots, 3 precedence constraints) for makespan (left), and computation
time (right). Lower means better performance. Wilcoxon significance levels are annotated for Sadcher compared to HeteroMRTA variants. All other
pairwise differences are statistically significant (p < 0.05), except between S-HeteroMRTA and Greedy (p = 0.21). For algorithms requiring full solution
construction, total computation time is reported; for methods returning instantaneous assignments, both time per decision and total time are shown.
<div style="height: 5rem;"></div>
<div class="image-grid text-center mb-1">
    <div class="row row-cols-1 row-cols-sm-2g-1">
      <div class="col">
        <img class="img-fluid object-fit-contain" src="{% include fix_link.html link='/assets/images/papers/sadcher_MRTA/1v1_0_500_833_paper.png' %}" alt="Image 1" style="max-width: 100%; height: auto;">
      </div>
    </div>
  </div>
  <p class="text">
  </p>


Pairwise makespan comparison of HeteroMRTA vs. Sadcher (left)
and S-HeteroMRTA vs. S-Sadcher (right). Each point is one solved instance;
points below the diagonal indicate better performance by (S-)Sadcher.


<div style="height: 5rem;"></div>
<div class="image-grid text-center mb-1">
    <div class="row row-cols-1 row-cols-sm-2g-1">
      <div class="col">
        <img class="img-fluid object-fit-contain" src="{% include fix_link.html link='/assets/images/papers/sadcher_MRTA/2x2_scaling_graphs_with_comp_time.png' %}" alt="Image 1" style="max-width: 100%; height: auto;">
      </div>
    </div>
  </div>
  <p class="text">
  </p>


Relative makespan gap to Sadcher for 3, 5, and 20 robots
(top left to bottom left). Bottom right: Computation time for 3 robots
(for algorithms requiring full solution construction (Sample-HeteroMRTA,
Sample-Sadcher, MILP), total computation time is reported, for methods
returning instantaneous assignments (HeteroMRTA, Sadcher, Greedy), time
per decision is reported). Task counts M ∈ [6, 250], with S = 3 skills and
M/5 precedence constraints. Each point shows the mean over 100 runs.






<h3> Conclusion </h3>
In this work, we proposed Sadcher - an IL framework to
address real-time task assignment for heterogeneous multi-
robot teams, incorporating dynamic coalition formation and
precedence constraints. The combination of reward predic-
tion and relaxed bipartite matching yields strong performance
with feasibility guarantees. Sadcher outperforms RL-based
and heuristic baselines in makespan across small to medium-
sized robot teams and a wide range of task counts. For
bigger teams, the makespan advantage narrows. Sadcher can
generate assignments in real-time across all tested problem
sizes, but the sampling variant S-Sadcher is only real-time for
smaller problems. Sadcher relies on a large (computationally
expensive) dataset of expert demonstrations for training.
Future work could extend our framework to incorporate
battery budgets, deadlines, or time windows. Furthermore,
fine-tuning IL policies with RL could increase performance
on larger problem instances where expert solutions are very
expensive or infeasible to obtain. Finally, the field would
benefit from a standardized benchmark dataset. While our
250,000-instance dataset targets complex MRTA, expanding
it with simpler, larger, and multi-objective scenarios would
allow evaluation across a wider range of methods.

