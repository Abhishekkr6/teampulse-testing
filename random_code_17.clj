(ns random-code-17
  (:require [clojure.string :as str]))

;; Random code generator
(defn generate-random-code [length]
  (let [characters "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"]
    (apply str (take length (repeatedly #(rand-nth characters))))))

(println "Random Code Generator")
(println (str/join (repeat 20 "=")))
(println)

(doseq [i (range 1 6)]
  (let [code (generate-random-code 12)]
    (println (str "Code #" i ": " code))))

(let [timestamp (java.time.LocalDateTime/now)]
  (println)
  (println (str "Generated at: " (.format timestamp (java.time.format.DateTimeFormatter/ofPattern "yyyy-MM-dd HH:mm:ss")))))


