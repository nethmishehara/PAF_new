package com.example.backend.model.Kavi;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.*;

@Document(collection = "users")
public class User {

    @Id
    private String id;

    private String name;
    private String bio;
    private String profilePicture;

    private List<String> skills = new ArrayList<>();
    private List<String> skillsToImprove = new ArrayList<>();
    private List<String> followers = new ArrayList<>();
    private List<String> following = new ArrayList<>();

    public User() {}

    public User(String name, String bio, String profilePicture,
                List<String> skills, List<String> skillsToImprove,
                List<String> followers, List<String> following) {

        this.name = name;
        this.bio = bio;
        this.profilePicture = profilePicture;
        this.skills = skills != null ? skills : new ArrayList<>();
        this.skillsToImprove = skillsToImprove != null ? skillsToImprove : new ArrayList<>();
        this.followers = followers != null ? followers : new ArrayList<>();
        this.following = following != null ? following : new ArrayList<>();
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getBio() {
        return bio;
    }

    public void setBio(String bio) {
        this.bio = bio;
    }

    public String getProfilePicture() {
        return profilePicture;
    }

    public void setProfilePicture(String profilePicture) {
        this.profilePicture = profilePicture;
    }

    public List<String> getSkills() {
        return skills;
    }

    public void setSkills(List<String> skills) {
        this.skills = skills != null ? skills : new ArrayList<>();
    }

    public List<String> getSkillsToImprove() {
        return skillsToImprove;
    }

    public void setSkillsToImprove(List<String> skillsToImprove) {
        this.skillsToImprove = skillsToImprove != null ? skillsToImprove : new ArrayList<>();
    }

    public List<String> getFollowers() {
        return followers;
    }

    public void setFollowers(List<String> followers) {
        this.followers = followers != null ? followers : new ArrayList<>();
    }

    public List<String> getFollowing() {
        return following;
    }

    public void setFollowing(List<String> following) {
        this.following = following != null ? following : new ArrayList<>();
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof User user)) return false;
        return Objects.equals(id, user.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }

    @Override
    public String toString() {
        return "User{" +
               "id='" + id + '\'' +
               ", name='" + name + '\'' +
               ", bio='" + bio + '\'' +
               ", profilePicture='" + profilePicture + '\'' +
               ", skills=" + skills +
               ", skillsToImprove=" + skillsToImprove +
               ", followers=" + followers +
               ", following=" + following +
               '}';
    }
}
