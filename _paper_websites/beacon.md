---
title: "BEACON: Language-Conditioned Navigation Affordance Prediction under Occlusion"
authors:
  - name: "Xinyu Gao"
    url: "https://xin-yu-gao.github.io/"
    superscript: "1"
  - name: "Gang Chen"
    url: "https://g-ch.github.io/"
    superscript: "1,†"
  - name: "Javier Alonso-Mora"
    url: "https://autonomousrobots.nl/people/"
    superscript: "1"
affiliations:
  - name: "TU Delft"
    superscript: "1"
    url: "https://tudelft.nl"
  - name: "Corresponding Author"
    superscript: "†"
release_date: 2026-03-09 # publication or relevant date, approximated if not sure. Just for display purposes and ordering.
links: # If you have other website for the project, github repos, datasets, etc. put it here. You can also add an icon from https://icons.getbootstrap.com/
  - name: Paper
    icon: bi-file-earmark-pdf
    url: "https://arxiv.org/pdf/2603.09961"
  - name: Code
    icon: bi-github
    url: "https://github.com/HsinyuG/BEACON"
  - name: MSc Thesis
    icon: bi-file-text
    url: "https://repository.tudelft.nl/record/uuid:8f650e8a-1b46-4fa9-9f46-dcf29a4f01f1"
related_project_id: "explicit-representations"
sitemap: false # Exclude from sitemap
---

<style>
  .beacon-stats {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 1rem;
    margin: 1.5rem 0;
  }
  .beacon-stats .stat-card {
    flex: 1 1 140px;
    max-width: 220px;
    padding: 0.9rem 1rem;
    text-align: center;
    background: #f8f9fa;
    border: 1px solid #e9ecef;
    border-radius: 10px;
  }
  .beacon-stats .stat-value {
    display: block;
    font-size: 1.35rem;
    font-weight: 700;
    color: #212529;
  }
  .beacon-stats .stat-label {
    display: block;
    font-size: 0.8rem;
    color: #6c757d;
    margin-top: 0.2rem;
  }
</style>

<hr/>

<h2 align="center"><u>Abstract</u></h2>

<div class="row justify-content-center">
  <div class="col-12">
    <img src="{% include fix_link.html link='/assets/images/papers/beacon/teaser.jpg' %}" width="100%" alt="BEACON teaser">
  </div>
</div>

<p align="justify">
  Language-conditioned local navigation requires a robot to infer a nearby traversable target location from its current observation and an open-vocabulary, relational instruction. Existing vision-language spatial grounding methods usually rely on vision-language models (VLMs) to reason in image space, producing 2D predictions tied to visible pixels. As a result, they struggle to infer target locations in occluded regions, typically caused by furniture or moving humans. To address this issue, we present <b>BEACON</b>, which predicts an ego-centric Bird's-Eye View (BEV) affordance heatmap over a bounded local region including occluded areas. Given an instruction and surround-view RGB-D observations from four directions around the robot, BEACON predicts the BEV heatmap by injecting spatial cues into a VLM and fusing the VLM's output with depth-derived BEV features. Using an occlusion-aware dataset built in the Habitat simulator, we conduct detailed experimental analysis to validate both our BEV space formulation and the design choices of each module. Our method improves the accuracy averaged across geodesic thresholds by 22.74 percentage points over the state-of-the-art image-space baseline on the validation subset with occluded target locations.
</p>

<div class="beacon-stats">
  <div class="stat-card"><span class="stat-value">+22.74 pp</span><span class="stat-label">geodesic accuracy over the best image-space baseline on the occluded subset</span></div>
  <div class="stat-card"><span class="stat-value">+10.68 pp</span><span class="stat-label">over direct BEV point prediction fine-tuning</span></div>
  <div class="stat-card"><span class="stat-value">75K / 12K</span><span class="stat-label">train / validation, occlusion-aware dataset in Habitat 3.0</span></div>
  <div class="stat-card"><span class="stat-value">2.6%</span><span class="stat-label">structurally invalid rate, one order of magnitude lower than all baselines</span></div>
</div>

<hr/>

<h2 align="center"><u>Task</u></h2>
<p align="justify">
  The robot receives a free-form, spatially grounded natural-language instruction that refers to a nearby navigation target that can be reached without exploration. However, the target location can be occluded by static objects or by moving humans, and existing image-space methods struggle to infer occluded target locations, because they are tied to visible pixels.
</p>

<div class="row justify-content-center">
  <div class="col-10">
    <img src="{% include fix_link.html link='/assets/images/papers/beacon/dataset.jpg' %}" width="100%" alt="Task and dataset examples">
  </div>
</div>
<p align="justify">
  Examples of language-conditioned local navigation under occlusion. The <span style="color:#0AADFF;">blue boxes</span> mark the robot, the <span style="color:red;">red boxes</span> highlight humans and objects that cause occlusions, and the <span style="color:rgb(7, 204, 7);">green boxes</span> indicate target regions.
</p>

<hr/>

<h2 align="center"><u>Method</u></h2>

<div class="row justify-content-center">
  <div class="col-12">
    <img src="{% include fix_link.html link='/assets/images/papers/beacon/pipeline.png' %}" width="100%" alt="BEACON overview">
  </div>
</div>
<p align="justify">
  Given a free-form, spatially grounded natural-language instruction and single-frame surround-view RGB-D observations, BEACON combines an Ego-Aligned Vision-Language Model with a Geometry-Aware Bird's-Eye View Encoder and predicts an affordance heatmap in ego-centric BEV via a Post-Fusion Affordance Decoder, where affordance denotes the score indicating how suitable each location is as a local navigation target; inference takes the argmax as the final predicted target point.
</p>

<div class="row justify-content-center mt-4">
  <div class="col-12">
    <img src="{% include fix_link.html link='/assets/images/papers/beacon/architecture.jpg' %}" width="100%" alt="BEACON architecture">
  </div>
</div>
<p align="justify">
  Specifically, <b>Stage 1</b> adapts the VLM with learned 3D position embeddings and auto-derived ego-centric instruction tuning, converting the annotated target into a coarse direction-and-range answer, for example, "Move towards the FrontRight Region with a Big step." <b>Stage 2</b> loads the Stage 1 weights, uses the final hidden state of a [NAV] special token as the instruction-conditioned summary embedding, and post-fuses it with Geometry-Aware BEV features to predict the heatmap, supervised as geodesic target regions rather than a single point.
</p>

<hr/>

<h2 align="center"><u>Results</u></h2>
<p align="justify">
  Our method performs best on both the full validation set and the occluded-target subset over different metrics, with 22.74 percentage points higher geodesic accuracy than the best image-space baseline and 10.68 percentage points higher than the direct VLM plus point-head baseline on the occluded subset. The structurally invalid rate is reduced to only 2.6 percent, one order of magnitude lower than all baselines.
</p>

<div class="row justify-content-center">
  <div class="col-12">
    <img src="{% include fix_link.html link='/assets/images/papers/beacon/results.png' %}" width="100%" alt="Main results">
  </div>
</div>
<p align="justify">
  Overall quantitative results on local navigation target prediction, comparing image-space baselines and BEACON on the full validation set and occluded-target subset.
</p>

<div class="row justify-content-center mt-4">
  <div class="col-12">
    <img src="{% include fix_link.html link='/assets/images/papers/beacon/ablations.png' %}" width="100%" alt="Ablations">
  </div>
</div>
<p align="justify">
  Ablation study of key Ego-Aligned VLM and BEV-space design choices.
</p>

<hr/>

<h2 align="center"><u>Qualitative Examples</u></h2>

<div class="row justify-content-center">
  <div class="col-12">
    <img src="{% include fix_link.html link='/assets/images/papers/beacon/qualitative_success.jpg' %}" width="100%" alt="Qualitative success cases">
  </div>
</div>
<p align="justify">
  Successful examples under heavy occlusion.
</p>

<div class="row justify-content-center mt-4">
  <div class="col-12">
    <img src="{% include fix_link.html link='/assets/images/papers/beacon/qualitative_failure.jpg' %}" width="100%" alt="Qualitative failure cases">
  </div>
</div>
<p align="justify">
  Failures due to landmark confusion or instruction ambiguity.
</p>
